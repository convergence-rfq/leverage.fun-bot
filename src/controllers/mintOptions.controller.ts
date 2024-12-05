import { Request, Response } from 'express';
import Config from '../config.js';
import {
  getEuroMetaPda,
  getExpirationDataPda,
  getOptionMintPda,
  getWriterMintPda,
  getUnderlyingPoolPda,
} from '../utils/pdas.js';
import {
  sleep,
  OptionTypeV2,
  postTelegramMessage,
  getAtaForUser,
} from '../utils/index.js';
import * as anchor from '@coral-xyz/anchor';
import BN from 'bn.js';
import { getProgram } from '../utils/programUtils.js';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token.js';
import { Transaction } from '@solana/web3.js';
import cron from 'node-cron';

async function processMintingTransaction(
  provider: anchor.AnchorProvider,
  expiration: BN,
): Promise<string> {
  const program = await getProgram(provider);
  const priceDecimals = 2;
  const [expirationData, expirationDataBump] = getExpirationDataPda(
    Config.TESTNET_WETH_MINT,
    expiration,
    Config.TESTNET_ORACLE_PUBLIC_KEY,
  );

  const initExpirationDataInstruction = await program.methods
    .initExpirationData(expiration, priceDecimals, 1)
    .accounts({
      payer: provider.publicKey,
      underlyingMint: Config.TESTNET_WETH_MINT,
      expirationData: expirationData,
      oracle: Config.TESTNET_ORACLE_PUBLIC_KEY,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([Config.ADMIN_KEYPAIR])
    .instruction();
  const underlyingPrice = 25_000;
  const strikePrices = [
    new BN(Math.pow(10, priceDecimals) * (underlyingPrice + 1)),
  ];
  const [underlyingPool] = getUnderlyingPoolPda(Config.TESTNET_WETH_MINT);
  const [euroMetaKey, euroMetaBump] = getEuroMetaPda(
    Config.TESTNET_WETH_MINT,
    Config.TESTNET_QUOTE_MINT,
    expiration,
    OptionTypeV2.CALL,
    underlyingPool,
    strikePrices,
  );
  const underlyingAmountPerContract = new BN(1_000_000);
  const [optionMint] = getOptionMintPda(euroMetaKey);
  const [writerMint] = getWriterMintPda(euroMetaKey);
  const euroMeta = {
    underlyingMint: Config.TESTNET_WETH_MINT,
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
    optionType: OptionTypeV2.CALL,
  };
  const createEuroMetaV2Instruction = await program.methods
    .createEuroMetaV2(
      euroMeta.expiration,
      euroMeta.strikePrices,
      euroMeta.oracleProviderId,
      euroMeta.optionType,
      expirationDataBump,
      euroMeta.underlyingAmountPerContract,
      euroMeta.priceDecimals,
    )
    .accounts({
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
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([Config.ADMIN_KEYPAIR])
    .instruction();
  {
    const tx = new Transaction().add(initExpirationDataInstruction);
    tx.add(createEuroMetaV2Instruction);
    const sig = await provider.sendAndConfirm(tx);
    console.log(`Euro meta created: ${sig}`);
    sleep(5000);
  }
  const wholeContracts = 2.5;
  const size = new BN(Math.pow(10, 4)).muln(wholeContracts);
  const atas = await getAtaForUser(
    euroMeta.optionMint,
    euroMeta.writerMint,
    euroMeta.underlyingMint,
    provider.publicKey,
  );
  if (!atas) {
    throw new Error('Failed to get ATAs');
  }
  const mintOptionInstruction = await program.methods
    .mintOptionsV2(size, OptionTypeV2.CALL)
    .accounts({
      payer: provider.publicKey,
      euroMeta: euroMetaKey,
      collateralPool: underlyingPool,
      optionMint: euroMeta.optionMint,
      writerMint: euroMeta.writerMint,
      minterCollateral: atas.underlyingMintAta,
      optionDestination: atas.optionMintAta,
      writerDestination: atas.writerMintAta,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .signers([Config.ADMIN_KEYPAIR])
    .instruction();
  {
    const tx = new Transaction().add(mintOptionInstruction);
    return await provider.sendAndConfirm(tx);
  }
}

export async function scheduleMintingProcess(provider: anchor.AnchorProvider) {
  cron.schedule('30 * * * *', async () => {
    try {
      const expiration = new BN(new Date().getTime() / 1000 + 3600);
      const txHash = await processMintingTransaction(provider, expiration);
      if (txHash) {
        await postTelegramMessage(txHash);
        console.log(`Transaction completed successfully: ${txHash}`);
      }
    } catch (error) {
      console.error('Scheduled transaction failed:', error);
    }
  });
}

export async function startMintingOptions(_req: Request, res: Response) {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  scheduleMintingProcess(provider).catch(error => {
    console.error('Failed to start cron job:', error);
  });

  res.status(202).json({
    message: 'Minting options cron job started',
    status: 'pending',
  });
}
