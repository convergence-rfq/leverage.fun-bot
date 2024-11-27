import { Request, Response } from 'express';
import Config from '../config.js';
import { getExpirationDataPda } from '../utils/pdas.js';
import * as anchor from '@coral-xyz/anchor';
import BN from 'bn.js';
import { getProgram } from '../utils/programUtils.js';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token.js';
import { Transaction } from '@solana/web3.js';

async function getMintOptions(_req: Request, res: Response) {
  res.send('Cannot GET /mint-options');
}

async function startMintingOptions(_req: Request, res: Response) {
  const expiration = new BN(new Date().getTime() / 1000 + 3600);
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = await getProgram(provider);
  const priceDecimals = 2;
  const [expirationData, _expirationDataBump] = getExpirationDataPda(
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
  const tx = new Transaction().add(initExpirationDataInstruction);
  const txHash = await provider.sendAndConfirm(tx);
  res.send(`Transaction sent: ${txHash}`);
}

export { getMintOptions, startMintingOptions };
