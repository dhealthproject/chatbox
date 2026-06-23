import { createSolanaRpc, type Address } from '@solana/kit';
import { findAssociatedTokenPda } from '@solana-program/token';
import { address } from 'gill';
import { CurrencyMap, type Currency } from '../types';

function normalizeMemo(memo: string | null | undefined): string {
    if (!memo) {
        return '';
    }
    return memo.replace(/^\[\d+\]\s+/, '').trim();
}

function extractMemoFromLogs(logMessages: readonly string[] | null | undefined): string | null {
    if (!logMessages) {
        return null;
    }
    for (const log of logMessages) {
        const match = log.match(/Memo \(len \d+\): "(.+)"$/);
        if (match?.[1]) {
            return match[1];
        }
    }
    return null;
}

async function checkSignaturesForMemo(
    rpc: ReturnType<typeof createSolanaRpc>,
    addressToCheck: string,
    expectedMemo: string,
): Promise<boolean> {
    const signatures = await rpc
        .getSignaturesForAddress(addressToCheck as Address, { limit: 25, commitment: 'confirmed' })
        .send();

    for (const entry of signatures) {
        const memo = normalizeMemo(entry.memo);
        if (memo === expectedMemo) {
            return true;
        }

        if (!memo && entry.signature) {
            const tx = await rpc
                .getTransaction(entry.signature, {
                    encoding: 'json',
                    maxSupportedTransactionVersion: 0,
                    commitment: 'confirmed',
                })
                .send();
            const fromLogs = extractMemoFromLogs(tx?.meta?.logMessages);
            if (fromLogs === expectedMemo) {
                return true;
            }
        }
    }

    return false;
}

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
    rpcUrl: string;
    merchantWallet: string;
    currency: string;
    expectedMemo: string;
    signal?: AbortSignal;
    intervalMs?: number;
    maxAttempts?: number;
}

export async function pollForQrPayment({
    rpcUrl,
    merchantWallet,
    currency,
    expectedMemo,
    signal,
    intervalMs = 2000,
    maxAttempts = 90,
}: QrPaymentPollParams): Promise<boolean> {
    const rpc = createSolanaRpc(rpcUrl);
    const addresses = [merchantWallet];

    const tokenInfo = CurrencyMap[currency as Currency];
    if (tokenInfo && tokenInfo !== 'SOL') {
        try {
            const [ata] = await findAssociatedTokenPda({
                mint: tokenInfo.mint,
                owner: address(merchantWallet),
                tokenProgram: tokenInfo.tokenProgram,
            });
            addresses.push(String(ata));
        } catch (error) {
            console.warn('[pollForQrPayment] Failed to derive ATA:', error);
        }
    }

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (signal?.aborted) {
            return false;
        }

        for (const addr of addresses) {
            try {
                if (await checkSignaturesForMemo(rpc, addr, expectedMemo)) {
                    return true;
                }
            } catch (error) {
                console.warn('[pollForQrPayment] RPC error while checking', addr, error);
            }
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
