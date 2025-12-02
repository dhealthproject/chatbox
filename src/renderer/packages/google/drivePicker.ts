// Lightweight Google Drive Picker integration for the renderer
// Dynamically loads gapi and picker scripts, performs OAuth, opens Picker, and returns selected files' metadata

type GooglePickerFile = {
  id: string
  name: string
  mimeType: string
  sizeBytes?: number
}

type PickResult = {
  files: GooglePickerFile[]
  accessToken: string
}

const GAPI_SCRIPT_SRC = 'https://apis.google.com/js/api.js'
const PICKER_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

let gapiLoaded = false
let googleLoaded = false
type TokenCache = {
  token: string
  expiresAt: number
}

let cachedAccessToken: TokenCache | null = null
let hasGrantedDriveScope = false

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

async function ensureGapiLoaded(): Promise<void> {
  if (gapiLoaded) return
  await loadScript(GAPI_SCRIPT_SRC)
  // @ts-ignore
  await new Promise<void>((resolve) => window.gapi.load('client:picker', () => resolve()))
  gapiLoaded = true
}

async function ensureGoogleIdentityLoaded(): Promise<void> {
  if (googleLoaded) return
  await loadScript(PICKER_SCRIPT_SRC)
  googleLoaded = true
}

function isTokenFresh(cache: TokenCache | null): cache is TokenCache {
  return !!cache && cache.expiresAt > Date.now()
}

function deriveExpiration(expiresIn?: number | string): number {
  const numericExpiresIn = typeof expiresIn === 'string' ? Number.parseInt(expiresIn, 10) : expiresIn
  const lifetimeSeconds = Number.isFinite(numericExpiresIn) && numericExpiresIn ? numericExpiresIn : 3600
  const bufferSeconds = Math.min(60, Math.floor(lifetimeSeconds * 0.1))
  return Date.now() + Math.max(lifetimeSeconds - bufferSeconds, 1) * 1000
}

function isInteractionRequiredError(error: unknown): boolean {
  if (!error) return false
  const details = (error as any)?.details
  const code = typeof details?.error === 'string' ? details.error : undefined
  const message = typeof (error as any)?.message === 'string' ? (error as any).message : ''
  const haystack = `${code ?? ''} ${message}`.toLowerCase()
  return ['interaction_required', 'consent_required', 'login_required', 'account_selection_required'].some((token) =>
    haystack.includes(token)
  )
}

async function obtainAccessToken(params: { clientId: string; scope: string }): Promise<string> {
  if (isTokenFresh(cachedAccessToken)) {
    return cachedAccessToken.token
  }

  // @ts-ignore
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: params.clientId,
    scope: params.scope,
    callback: () => {},
  })

  const requestWithPrompt = (prompt: 'none' | 'consent') =>
    new Promise<string>((resolve, reject) => {
      tokenClient.callback = (response: any) => {
        if (response?.access_token) {
          hasGrantedDriveScope = true
          cachedAccessToken = {
            token: response.access_token,
            expiresAt: deriveExpiration(response.expires_in),
          }
          resolve(response.access_token)
        } else if (response?.error) {
          const error = new Error(response.error_description || response.error)
          ;(error as any).details = response
          reject(error)
        } else {
          reject(new Error('No access token from Google'))
        }
      }

      try {
        tokenClient.requestAccessToken({ prompt, use_fedcm_for_prompt: true as any })
      } catch (err) {
        reject(err)
      }
    })

  const primaryPrompt: 'none' | 'consent' = hasGrantedDriveScope ? 'none' : 'consent'

  try {
    return await requestWithPrompt(primaryPrompt)
  } catch (error) {
    if (primaryPrompt === 'none' && isInteractionRequiredError(error)) {
      return await requestWithPrompt('consent')
    }
    throw error
  }
}

export async function pickFromGoogleDrive(params: {
  apiKey: string
  clientId: string
  scope?: string
  mimeTypes?: string[]
  multiselect?: boolean
}): Promise<PickResult | null> {
  const scope = params.scope || 'https://www.googleapis.com/auth/drive.readonly'
  const multiselect = params.multiselect ?? true

  await Promise.all([ensureGapiLoaded(), ensureGoogleIdentityLoaded()])

  // @ts-ignore
  const gapi = window.gapi
  // Load Drive API for metadata fetch if needed later
  await gapi.client.init({
    apiKey: params.apiKey,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  })

  const accessToken = await obtainAccessToken({ clientId: params.clientId, scope })

  // Build the Picker
  // @ts-ignore
  const google = window.google
  // @ts-ignore
  const docsView = new google.picker.DocsView(google.picker.ViewId.DOCS)
    // @ts-ignore
    .setIncludeFolders(true)
    // @ts-ignore
    .setSelectFolderEnabled(false) // Don't allow selecting folders, only navigate into them

  // Apply mimeType filter if provided (folders will still be visible for navigation)
  if (params.mimeTypes && params.mimeTypes.length) {
    // @ts-ignore
    docsView.setMimeTypes(params.mimeTypes.join(','))
  }

  // @ts-ignore
  const picker = new window.google.picker.PickerBuilder()
    // @ts-ignore
    .setOAuthToken(accessToken)
    .setDeveloperKey(params.apiKey)
    .setLocale(navigator.language || 'en')
    .setSize(window.innerWidth * 0.8, window.innerHeight * 0.8)
    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    // @ts-ignore
    .addView(docsView)

  // Explicitly set origin when running on http(s) to help postMessage bridging
  const origin = window.location.origin
  if (origin.startsWith('http://') || origin.startsWith('https://')) {
    // @ts-ignore
    picker.setOrigin(origin)
  }

  if (!multiselect) {
    // @ts-ignore
    picker.disableFeature(google.picker.Feature.MULTISELECT_ENABLED)
  }

  const result: PickResult | null = await new Promise((resolve) => {
    // @ts-ignore
    picker.setCallback((data: any) => {
      // @ts-ignore
      const google = window.google
      if (data.action === google.picker.Action.PICKED) {
        // Filter out folders - they can't be downloaded
        const FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder'
        const files: GooglePickerFile[] = (data.docs || [])
          .filter((d: any) => d.mimeType !== FOLDER_MIME_TYPE)
          .map((d: any) => ({
            id: d.id,
            name: d.name || d.id,
            mimeType: d.mimeType,
            sizeBytes: d.sizeBytes,
          }))
        resolve({ files, accessToken })
      } else if (data.action === google.picker.Action.CANCEL) {
        resolve(null)
      }
    })
    // @ts-ignore
    picker.build().setVisible(true)
  })

  return result
}

export async function downloadDriveFile(fileId: string, accessToken: string): Promise<Blob> {
  console.log('fileId', fileId)
  const downloadUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`
  const res = await fetch(downloadUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    throw new Error(`Failed to download file ${fileId}: ${res.status}`)
  }
  return await res.blob()
}
