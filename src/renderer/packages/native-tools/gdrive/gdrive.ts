import { tool } from "ai"
import { z } from 'zod'

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
    this.clientId = clientId || "1014546887035-51mtofld38h3snjesqhbc3o68jghnqaa.apps.googleusercontent.com";
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

  async getAccessToken(): Promise<string> {
    // Check if token exists and is still valid (with 5 minute buffer)
    if (this.accessToken && this.tokenExpiresAt && this.tokenExpiresAt > Date.now() + 5 * 60 * 1000) {
      return this.accessToken;
    }

    // Request new token via browser OAuth flow
    const scopes = 'https://www.googleapis.com/auth/drive.readonly';
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
}