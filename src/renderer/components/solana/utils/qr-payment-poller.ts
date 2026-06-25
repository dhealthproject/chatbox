import { getNonceStatus } from '@/packages/aidh-api';

async function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
    }

    await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);
        signal?.addEventListener(
            'abort',
            () => {
                clearTimeout(timeout);
                reject(new DOMException('Aborted', 'AbortError'));
            },
            { once: true },
        );
    });
}

export interface QrPaymentPollParams {
    apiKey: string;
    expectedMemo: string;
    signal?: AbortSignal;
    intervalMs?: number;
    maxAttempts?: number;
}

export async function pollForQrPayment({
    apiKey,
    expectedMemo,
    signal,
    intervalMs = 2000,
    maxAttempts = 90,
}: QrPaymentPollParams): Promise<boolean> {
    const nonce = expectedMemo;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (signal?.aborted) {
            return false;
        }

        try {
            const data = await getNonceStatus(apiKey, nonce);
            if (data.status === 'used') {
                return true;
            }
        } catch (error) {
            console.warn('[pollForQrPayment] Server error:', error);
        }

        if (attempt < maxAttempts) {
            try {
                await sleep(intervalMs, signal);
            } catch {
                return false;
            }
        }
    }

    return false;
}
