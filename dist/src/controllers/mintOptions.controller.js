import Config from '../config.js';
import { getEuroMetaPda, getExpirationDataPda, getOptionMintPda, getWriterMintPda, getUnderlyingPoolPda, getOptionCyclePda, getAuctionProgramVaultPda, getAuctionStatePda } from '../utils/pdas.js';
import { sleep, OptionTypeV2, // postTelegramMessage,
getAtaForUser } from '../utils/index.js';
import * as anchor from '@coral-xyz/anchor';
import BN from 'bn.js';
import { getProgram, getVaultsProgram } from '../utils/programUtils.js';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token.js';
import { Transaction } from '@solana/web3.js';
// import cron from 'node-cron';
async function processMintingTransaction(provider, expiration) {
    const program = await getProgram(provider);
    const vaultsProgram = await getVaultsProgram(provider);
    const priceDecimals = 2;
    const [expirationData, expirationDataBump] = getExpirationDataPda(Config.TESTNET_SOL_MINT, expiration, Config.TESTNET_ORACLE_PUBLIC_KEY);
    const initExpirationDataInstruction = await program.methods.initExpirationData(expiration, priceDecimals, 1).accounts({
        payer: provider.publicKey,
        underlyingMint: Config.TESTNET_SOL_MINT,
        expirationData: expirationData,
        oracle: Config.TESTNET_ORACLE_PUBLIC_KEY,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId
    }).signers([
        Config.ADMIN_KEYPAIR
    ]).instruction();
    const underlyingPrice = 25_000;
    const strikePrices = [
        new BN(Math.pow(10, priceDecimals) * (underlyingPrice + 1))
    ];
    const [underlyingPool] = getUnderlyingPoolPda(Config.TESTNET_SOL_MINT);
    const [euroMetaKey, euroMetaBump] = getEuroMetaPda(Config.TESTNET_SOL_MINT, Config.TESTNET_QUOTE_MINT, expiration, OptionTypeV2.CALL, underlyingPool, strikePrices);
    const underlyingAmountPerContract = new BN(1_000_000);
    const [optionMint] = getOptionMintPda(euroMetaKey);
    const [writerMint] = getWriterMintPda(euroMetaKey);
    const euroMeta = {
        underlyingMint: Config.TESTNET_SOL_MINT,
        collateralPool: underlyingPool,
        stableMint: Config.TESTNET_QUOTE_MINT,
        stableDecimals: 6,
        underlyingDecimals: 6,
        underlyingAmountPerContract,
        oracle: Config.TESTNET_ORACLE_PUBLIC_KEY,
        strikePrices,
        priceDecimals,
        optionMint,
        writerMint,
        expiration,
        expirationData,
        bumpSeed: euroMetaBump,
        oracleProviderId: 1,
        optionType: OptionTypeV2.CALL
    };
    const createEuroMetaV2Instruction = await program.methods.createEuroMetaV2(euroMeta.expiration, euroMeta.strikePrices, euroMeta.oracleProviderId, euroMeta.optionType, expirationDataBump, euroMeta.underlyingAmountPerContract, euroMeta.priceDecimals).accounts({
        payer: provider.publicKey,
        underlyingMint: euroMeta.underlyingMint,
        collateralPool: euroMeta.collateralPool,
        stableMint: euroMeta.stableMint,
        euroMeta: euroMetaKey,
        expirationData: euroMeta.expirationData,
        optionMint: euroMeta.optionMint,
        writerMint: euroMeta.writerMint,
        oracle: euroMeta.oracle,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId
    }).signers([
        Config.ADMIN_KEYPAIR
    ]).instruction();
    {
        const tx = new Transaction().add(initExpirationDataInstruction);
        tx.add(createEuroMetaV2Instruction);
        const sig = await provider.sendAndConfirm(tx);
        console.log(`Euro meta created: ${sig}`);
        sleep(5000);
    }
    const wholeContracts = 2.5;
    const size = new BN(Math.pow(10, 4)).muln(wholeContracts);
    const atas = await getAtaForUser(euroMeta.optionMint, euroMeta.writerMint, euroMeta.underlyingMint, provider.publicKey);
    if (!atas) {
        throw new Error('Failed to get ATAs');
    }
    // const mintOptionInstruction = await program.methods
    //   .mintOptionsV2(size, OptionTypeV2.CALL)
    //   .accounts({
    //     payer: provider.publicKey,
    //     euroMeta: euroMetaKey,
    //     collateralPool: underlyingPool,
    //     optionMint: euroMeta.optionMint,
    //     writerMint: euroMeta.writerMint,
    //     minterCollateral: atas.underlyingMintAta,
    //     optionDestination: atas.optionMintAta,
    //     writerDestination: atas.writerMintAta,
    //     tokenProgram: TOKEN_PROGRAM_ID,
    //   })
    //   .signers([Config.ADMIN_KEYPAIR])
    //   .instruction();
    const cycleNumber = new BN(1);
    const strikePrice = new BN(269);
    const optionType = OptionTypeV2.CALL;
    const auctionType = 0;
    const startingBid = new BN(1_000_000);
    const duration = new BN(604_800);
    const [optionCycle] = getOptionCyclePda(provider.publicKey, cycleNumber);
    const [auctionProgramVault] = getAuctionProgramVaultPda(optionCycle);
    const [auctionState] = getAuctionStatePda(provider.publicKey);
    const auctionProgramAtas = await getAtaForUser(euroMeta.optionMint, euroMeta.writerMint, euroMeta.underlyingMint, auctionProgramVault, true);
    if (!auctionProgramAtas) {
        throw new Error('Failed to get auction program ATAs');
    }
    const mintOptionInstruction = await vaultsProgram.methods.startCycle(cycleNumber, strikePrice, underlyingAmountPerContract, size, priceDecimals, optionType, auctionType, startingBid, duration).accounts({
        vaultAuthority: provider.publicKey,
        optionCycle,
        vaultOptionTokenAccount: auctionProgramAtas.optionMintAta,
        vaultWriterTokenAccount: auctionProgramAtas.writerMintAta,
        auctionVault: auctionProgramVault,
        creatorTokenAccount: atas.optionMintAta,
        underlyingMint: euroMeta.underlyingMint,
        stableMint: euroMeta.stableMint,
        underlyingPool: euroMeta.collateralPool,
        stablePool: euroMeta.collateralPool,
        euroMeta: euroMetaKey,
        optionMint: euroMeta.optionMint,
        writerMint: euroMeta.writerMint,
        expirationData: euroMeta.expirationData,
        oracle: euroMeta.oracle,
        auctionState,
        euroPrimitiveProgram: Config.LEVERAGE_FUN_PROGRAM_ID,
        optionAuctionProgram: Config.AUCTION_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId
    }).instruction();
    {
        const tx = new Transaction().add(mintOptionInstruction);
        return await provider.sendAndConfirm(tx);
    }
}
export async function scheduleMintingProcess(provider) {
    // cron.schedule('30 * * * *', async () => {
    try {
        const expiration = new BN(new Date().getTime() / 1000 + 3600);
        const txHash = await processMintingTransaction(provider, expiration);
        if (txHash) {
            // await postTelegramMessage(txHash);
            console.log(`Transaction completed successfully: ${txHash}`);
        }
    } catch (error) {
        console.error('Scheduled transaction failed:', error);
    }
// });
}
export async function startMintingOptions(_req, res) {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    scheduleMintingProcess(provider).catch((error)=>{
        console.error('Failed to start cron job:', error);
    });
    res.status(202).json({
        message: 'Minting options cron job started',
        status: 'pending'
    });
}

//# sourceMappingURL=mintOptions.controller.js.map