import { tool } from "ai"
import { z } from 'zod'
import axios from "axios";
import { AIDH_API_KEY, AIDH_API_URL, GOOGLE_OAUTH_CLIENT_ID } from "@/variables";

export type FileContent = {
  type: string;
  text?: string;
  mimeType?: string;
  data?: string;
};

export class GDriveTool {
  private clientId: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number | null = null;
  private static gdriveToolInstance: GDriveTool;

  public static createInstance() {
    if (!GDriveTool.gdriveToolInstance) {
      GDriveTool.gdriveToolInstance = new GDriveTool();
    }
    return GDriveTool.gdriveToolInstance;
  }

  private constructor(clientId?: string) {
    this.clientId = clientId || GOOGLE_OAUTH_CLIENT_ID;
  }

  gdriveTool = tool({
    description:
      'Read the Google Drive folder given the name or ID (empty for root).',
    parameters: z.object({
      identifier: z.string().describe("The folder's name of ID."),
    }),
    execute: async (args) => {
      const identifier = args.identifier;

      try {
        return await this.readGDriveFolder(identifier)
      } catch (error) {
        return {
          error: `Failed to fetch URL: ${(error as Error).message}`,
        }
      }
    },
  })

  gdriveReadFileTool = tool({
    description:
      'Read a file from Google Drive by file ID. Supports text files, images, and PDFs. Images and PDFs are converted to base64.',
    parameters: z.object({
      fileId: z.string().describe("The Google Drive file ID to read"),
    }),
    execute: async (args) => {
      const fileId = args.fileId;

      try {
        return await this.readGDriveFile(fileId)
      } catch (error) {
        return {
          error: `Failed to read file: ${(error as Error).message}`,
        }
      }
    },
  })

  async getAccessToken(): Promise<string> {
    // Check if token exists and is still valid (with 5 minute buffer)
    if (this.accessToken && this.tokenExpiresAt && this.tokenExpiresAt > Date.now() + 5 * 60 * 1000) {
      return this.accessToken;
    }

    // Request new token via browser OAuth flow
    const scopes = 'https://www.googleapis.com/auth/drive.file';
    const redirectUri = `${window.location.origin}/oauth2callback`;
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', this.clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('prompt', 'consent');

    return new Promise((resolve, reject) => {
      const popup = window.open(authUrl.toString(), 'google-oauth', 'width=500,height=600');
      
      if (!popup) {
        reject(new Error('Failed to open OAuth popup. Please allow popups for this site.'));
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        // Verify origin for security
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === 'OAUTH_TOKEN') {
          window.removeEventListener('message', handleMessage);
          popup.close();
          
          if (event.data.token) {
            this.accessToken = event.data.token;
            this.tokenExpiresAt = event.data.expiresAt;
            resolve(event.data.token);
          } else {
            reject(new Error(event.data.error || 'OAuth failed'));
          }
        }
      };

      window.addEventListener('message', handleMessage);

      // Timeout after 10 minutes
      const timeout = setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        popup.close();
        reject(new Error('OAuth timeout'));
      }, 10 * 60 * 1000);
    });
  }

  async readGDriveFolder(identifier: string) {
    const accessToken = await this.getAccessToken();

    // Build Drive API query
    let q: string;
    if (!identifier) {
      // list root
      q = "'root' in parents and trashed = false";
    } else if (/^[a-zA-Z0-9_-]{10,}$/.test(identifier)) {
      // likely an ID
      q = `'${identifier}' in parents and trashed = false`;
    } else {
      // try to find folder by name, then list its children
      // first find folder id by name
      const findFolderUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        `name='${identifier.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
      )}&fields=files(id,name)`;

      const findResp = await fetch(findFolderUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      if (!findResp.ok) {
        throw new Error(`Failed to find folder: ${findResp.statusText}`);
      }
      
      const findJson = await findResp.json();
      const folder = Array.isArray(findJson.files) && findJson.files[0];
      if (!folder) {
        throw new Error('Folder not found: ' + identifier);
      }
      q = `'${folder.id}' in parents and trashed = false`;
    }

    const listUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,size)`;
    const listResp = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!listResp.ok) {
      throw new Error(`Failed to list folder: ${listResp.statusText}`);
    }

    const listJson = await listResp.json();
    return { content: [{ type: 'text', text: JSON.stringify(listJson) }] };
  }

  async readGDriveFile(identifier: string) {
    const accessToken = await this.getAccessToken();

    if (!identifier) {
      throw new Error('Missing identifier for readGDriveFile');
    }

    // resolve file id and metadata
    let fileId = identifier;
    let mimeType: string | undefined;

    if (!/^[a-zA-Z0-9_-]{10,}$/.test(identifier)) {
      // treat as name, search for file
      const findUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        `name='${identifier.replace(/'/g, "\\'")}' and trashed=false`
      )}&fields=files(id,name,mimeType,size)`;

      const findResp = await fetch(findUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!findResp.ok) {
        const errorText = await findResp.text();
        console.error(`File search failed - Status: ${findResp.status}, Response:`, errorText);
        throw new Error(`Failed to find file: ${findResp.status} ${findResp.statusText}`);
      }
      const findJson = await findResp.json();
      const file = Array.isArray(findJson.files) && findJson.files[0];
      if (!file) throw new Error('File not found: ' + identifier);
      fileId = file.id;
      mimeType = file.mimeType;
    }

    // If we don't already have mimeType (because identifier was an ID), fetch metadata
    if (!mimeType) {
      const metaUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,name,mimeType,size`;
      const metaResp = await fetch(metaUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!metaResp.ok) {
        const errorText = await metaResp.text();
        console.error(`Metadata fetch failed - Status: ${metaResp.status}, Response:`, errorText);
        throw new Error(`Failed to get file metadata: ${metaResp.status} ${metaResp.statusText} - ${errorText}`);
      }
      const metaJson = await metaResp.json();
      if (!metaJson.mimeType) {
        console.error('No mimeType in metadata response:', metaJson);
        throw new Error(`File metadata missing mimeType: ${JSON.stringify(metaJson)}`);
      }
      mimeType = metaJson.mimeType;
    }

    // Handle Google Workspace files (export) vs regular files (download)
    const exportMap: Record<string, string> = {
      'application/vnd.google-apps.document': 'text/plain',
      'application/vnd.google-apps.spreadsheet': 'text/csv',
      'application/vnd.google-apps.presentation': 'application/pdf',
    };

    let dataBuffer;
    let resultMime = mimeType;

    if (mimeType && exportMap[mimeType]) {
      const exportMime = exportMap[mimeType];
      const exportUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/export?mimeType=${encodeURIComponent(exportMime)}`;

      const resp = await fetch(exportUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error(`File export failed - Status: ${resp.status}, URL: ${exportUrl}, Response:`, errorText);
        throw new Error(`Failed to export file: ${resp.status} ${resp.statusText}`);
      }

      const arrayBuffer = await resp.arrayBuffer();
      dataBuffer = new Uint8Array(arrayBuffer);
      resultMime = exportMime;
    } else {
      const downloadUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`;
      const resp = await fetch(downloadUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error(`File download failed - Status: ${resp.status}, URL: ${downloadUrl}, Response:`, errorText);
        throw new Error(`Failed to download file: ${resp.status} ${resp.statusText}`);
      }

      const arrayBuffer = await resp.arrayBuffer();
      dataBuffer = new Uint8Array(arrayBuffer);
    }

    return await this.requestFileProcessing(resultMime, dataBuffer);
  }

  async requestFileProcessing(
    mime: string | undefined,
    dataBuffer: Uint8Array
  ): Promise<{ content: FileContent[] }> {
    const fileProcessingUrl = `${AIDH_API_URL}/file/process`;
    const resp = await axios.post(
      fileProcessingUrl,
      { mime, dataBuffer: Array.from(dataBuffer) },
      {
        headers: {
          'Authorization': `Bearer ${AIDH_API_KEY}`,
        },
        responseType: 'json',
      }
    );
    return resp.data;
  }
}