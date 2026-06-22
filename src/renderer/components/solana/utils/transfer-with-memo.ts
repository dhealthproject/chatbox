import {
    appendTransactionMessageInstructions,
    createSolanaRpc,
    createSolanaRpcSubscriptions,
    createTransactionMessage,
    getSignatureFromTransaction,
    pipe,
    sendAndConfirmTransactionFactory,
    setTransactionMessageFeePayerSigner,
    setTransactionMessageLifetimeUsingBlockhash,
    signTransactionMessageWithSigners,
    type TransactionSigner,
} from '@solana/kit';
import { getTransferSolInstruction } from '@solana-program/system';
import {
    findAssociatedTokenPda,
    getCreateAssociatedTokenIdempotentInstruction,
    getTransferInstruction,
    TOKEN_PROGRAM_ADDRESS,
} from '@solana-program/token';
import { address } from 'gill';
import { getAddMemoInstruction } from 'gill/programs';

function deriveWebSocketUrl(rpcUrl: string): string {
    if (rpcUrl.startsWith('https://')) {
        return rpcUrl.replace('https://', 'wss://');
    }
    if (rpcUrl.startsWith('http://')) {
        return rpcUrl.replace('http://', 'ws://');
    }
    if (rpcUrl.startsWith('wss://') || rpcUrl.startsWith('ws://')) {
        return rpcUrl;
    }
    return `wss://${rpcUrl}`;
}

export interface TransferWithMemoParams {
    rpcUrl: string;
    signer: TransactionSigner;
    to: string;
    amount: bigint;
    memo: string;
    mint?: string;
    createAccountIfNeeded?: boolean;
    commitment?: 'processed' | 'confirmed' | 'finalized';
}

export async function transferWithMemo({
    rpcUrl,
    signer,
    to,
    amount,
    memo,
    mint,
    createAccountIfNeeded = true,
    commitment = 'confirmed',
}: TransferWithMemoParams): Promise<{ signature: string }> {
    const rpc = createSolanaRpc(rpcUrl);
    const rpcSubscriptions = createSolanaRpcSubscriptions(deriveWebSocketUrl(rpcUrl));
    const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });

    const instructions = [getAddMemoInstruction({ memo })];

    if (!mint) {
        instructions.push(
            getTransferSolInstruction({
                source: signer,
                destination: address(to),
                amount,
            }),
        );
    } else {
        const mintAddress = address(mint);
        const toAddress = address(to);
        const fromAddress = signer.address;

        const [fromAta] = await findAssociatedTokenPda({
            mint: mintAddress,
            owner: fromAddress,
            tokenProgram: TOKEN_PROGRAM_ADDRESS,
        });
        const [toAta] = await findAssociatedTokenPda({
            mint: mintAddress,
            owner: toAddress,
            tokenProgram: TOKEN_PROGRAM_ADDRESS,
        });

        if (createAccountIfNeeded) {
            instructions.push(
                getCreateAssociatedTokenIdempotentInstruction({
                    mint: mintAddress,
                    owner: toAddress,
                    ata: toAta,
                    payer: signer,
                    tokenProgram: TOKEN_PROGRAM_ADDRESS,
                }),
            );
        }

        instructions.push(
            getTransferInstruction({
                source: fromAta,
                destination: toAta,
                amount,
                authority: signer,
            }),
        );
    }

    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(signer, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstructions(instructions, tx),
    );

    const signedTransaction = await signTransactionMessageWithSigners(transactionMessage);
    const signature = getSignatureFromTransaction(signedTransaction);

    await sendAndConfirmTransaction(signedTransaction, { commitment });

    return { signature };
}
