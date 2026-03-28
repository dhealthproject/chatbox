import { tool } from "ai"
import { z } from 'zod'
import { medicaments } from "./Medicaments"
import QRCode from 'qrcode'

export type Chmed16a1QrToolResult =
  | { status: 'success'; imageDataUrl: string }
  | { status: 'failed'; error: string }

export class CHMED16A1Tool {
  private static chmed16a1ToolInstance: CHMED16A1Tool;

  public static createInstance() {
    if (!CHMED16A1Tool.chmed16a1ToolInstance) {
      CHMED16A1Tool.chmed16a1ToolInstance = new CHMED16A1Tool();
    }
    return CHMED16A1Tool.chmed16a1ToolInstance;
  }

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  getMedicamentIdTool = tool({
    description:
      'Get the Swissmedic Product ID and details for a given medicament string',
    parameters: z.object({
      medicamentName: z.string().describe('The name of the medicament for which to retrieve ID and details'),
    }),
    execute: async (args) => {
      const medicamentName = args.medicamentName

      try {
        return this.getMedicamentId(medicamentName)
      } catch (error) {
        return {
          error: `Failed to create memory: ${(error as Error).message}`,
        }
      }
    },
  })

  generateQRCodesTool = tool({
    description: 'Generate CHMED16A1 QR codes from JSON string',
    parameters: z.object({
      jsonString: z.string().describe('CHMED16A1 JSON string to be converted into a QR code'),
    }),
    experimental_toToolResultContent: (result: Chmed16a1QrToolResult) => {
      if (result.status === 'success') {
        return [{ type: 'text' as const, text: JSON.stringify({ status: 'success' }) }]
      }
      return [{ type: 'text' as const, text: JSON.stringify({ status: 'failed' }) }]
    },
    execute: async (args): Promise<Chmed16a1QrToolResult> => {
      const jsonString = args.jsonString

      try {
        return await this.createQRCodes(jsonString)
      } catch (error) {
        return { status: 'failed', error: (error as Error).message }
      }
    },
  })

  async getMedicamentId(medicamentName: string) {
    try {
      let result: any[] = [];
      let maxSimilarity = [0, 0, 0];

      for (const medicament of medicaments) {
        const similarity = this.dice_coefficient(
          medicamentName.toLowerCase(),
          medicament.Swissmedic_Nm.toLowerCase(),
        );
        if (similarity > maxSimilarity[0]) {
          maxSimilarity[2] = maxSimilarity[1];
          maxSimilarity[1] = maxSimilarity[0];
          maxSimilarity[0] = similarity;
          if (result[1]) result[2] = result[1];
          if (result[0]) result[1] = result[0];
          result[0] = medicament;
        } else if (similarity > maxSimilarity[1]) {
          maxSimilarity[2] = maxSimilarity[1];
          maxSimilarity[1] = similarity;
          if (result[1]) result[2] = result[1];
          result[1] = medicament;
        } else if (similarity > maxSimilarity[2]) {
          maxSimilarity[2] = similarity;
          result[2] = medicament;
        }
      }
      return { content: [{ type: 'text', text: JSON.stringify(result) }] };;
    } catch (e) {
      return {
        error: `Error getting medicament id: ${(e as Error).message}`,
      }
    }
  }

  async createQRCodes(chmed16a1jsonString: string): Promise<Chmed16a1QrToolResult> {
    // 1. String → Uint8Array (replaces Buffer.from)
    const contentBuffer = new TextEncoder().encode(chmed16a1jsonString);

    // 2. Gzip (replaces zlib.gzip)
    const stream = new CompressionStream('gzip');
    const writer = stream.writable.getWriter();
    writer.write(contentBuffer);
    writer.close();
    const compressedBuffer = await new Response(stream.readable).arrayBuffer();

    // 3. ArrayBuffer → base64 (replaces buffer.toString('base64'))
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(compressedBuffer))
    );
    const base64StringWithHeader = 'CHMED16A1' + base64String;
    
    // 4. Generate QR code as data URL (replaces toFile)
    const dataUrl = await QRCode.toDataURL(base64StringWithHeader, {
      errorCorrectionLevel: 'L',
      type: 'image/png',
    });

    return { status: 'success' as const, imageDataUrl: dataUrl }
  }

  dice_coefficient(s1: string, s2: string) {
    const A = this.n_grams(s1, 3);
    const B = this.n_grams(s2, 3);
    const AiB = this.intersection_length(A, B);
    const ApB = this.sumLength(A, B);
    return 2 * AiB / ApB;
  }

  n_grams(s: string, n: number) {
    const l = s.length;
    if (n === 0 || n > l) return [];
    const arr = [...s];
    const result: string[] = [];
    for (let i = 0; i < l - n; i++) {
      let gram = arr[i];
      if (l - 1 - i === n) break;
      for (let j = i + 1; j < i + n; j++) {
        gram += arr[j];
      }
      result.push(gram);
    }
    return result;
  }

  intersection_length(a: string[], b: string[]) {
    let result = 0;
    a.forEach(item_a => {
      b.forEach(item_b => {
        if (item_a === item_b) result++;
      });
    });
    return result;
  }

  sumLength(a: string[], b: string[]) {
    return a.length + b.length;
  }
}