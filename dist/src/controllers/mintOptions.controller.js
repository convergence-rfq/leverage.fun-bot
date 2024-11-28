import Config from '../config.js';
import { getExpirationDataPda } from '../utils/pdas.js';
import { sleep, postTelegramMessage } from '../utils/index.js';
import * as anchor from '@coral-xyz/anchor';
import BN from 'bn.js';
import { getProgram } from '../utils/programUtils.js';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token.js';
import { Transaction } from '@solana/web3.js';
async function processMintingTransaction(provider, expiration) {
    const program = await getProgram(provider);
    const priceDecimals = 2;
    const [expirationData, _expirationDataBump] = getExpirationDataPda(Config.TESTNET_WETH_MINT, expiration, Config.TESTNET_ORACLE_PUBLIC_KEY);
    const initExpirationDataInstruction = await program.methods.initExpirationData(expiration, priceDecimals, 1).accounts({
        payer: provider.publicKey,
        underlyingMint: Config.TESTNET_WETH_MINT,
        expirationData: expirationData,
        oracle: Config.TESTNET_ORACLE_PUBLIC_KEY,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId
    }).signers([
        Config.ADMIN_KEYPAIR
    ]).instruction();
    const tx = new Transaction().add(initExpirationDataInstruction);
    return await provider.sendAndConfirm(tx);
}
async function continuousMintingProcess(provider) {
    // eslint-disable-next-line no-constant-condition
    while(true){
        try {
            const expiration = new BN(new Date().getTime() / 1000 + 30);
            const txHash = await processMintingTransaction(provider, expiration);
            await postTelegramMessage(txHash);
            console.log(`Transaction completed successfully: ${txHash}`);
        } catch (error) {
            console.error('Background transaction failed:', error);
        }
        await sleep(3600000);
    }
}
export async function getMintOptions(_req, res) {
    res.send('Cannot GET /mint-options');
}
export async function startMintingOptions(_req, res) {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    continuousMintingProcess(provider).catch((error)=>{
        console.error('Continuous processing failed:', error);
    });
    res.status(202).json({
        message: 'Minting options started',
        status: 'pending'
    });
}

//# sourceMappingURL=mintOptions.controller.js.map