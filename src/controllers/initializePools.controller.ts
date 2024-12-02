import { getProgram } from '@/utils/programUtils';
import Config from '@/config';
import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { Request, Response } from 'express';
import { EuroPrimitive } from '@/types/euro_primitive';
import {
  getUnderlyingPoolPda,
  getQuotePoolPda,
  getPoolAuthorityPda,
} from '@/utils/pdas';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';

export async function getInitializePools(_req: Request, res: Response) {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = await getProgram(provider);
  await initializePools(
    Config.TESTNET_WETH_MINT,
    Config.TESTNET_QUOTE_MINT,
    provider,
    program,
  );
  res.status(200).json({
    message: 'Initialize pools',
  });
}

export async function initializePools(
  underlyingMint: PublicKey,
  quoteMint: PublicKey,
  provider: anchor.AnchorProvider,
  program: anchor.Program<EuroPrimitive>,
) {
  const [underlyingPool] = getUnderlyingPoolPda(underlyingMint);
  const [quotePool] = getQuotePoolPda(quoteMint);
  const [poolAuthority] = getPoolAuthorityPda();
  {
    const txHash = await program.methods
      .initializeStablePool()
      .accounts({
        payer: provider.publicKey,
        stableMint: quoteMint,
        stablePool: quotePool,
        poolAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([Config.ADMIN_KEYPAIR])
      .rpc();
    console.log(`Transaction completed successfully: ${txHash}`);
  }
  const txHash = await program.methods
    .initializeUnderlyingPool()
    .accounts({
      payer: provider.publicKey,
      underlyingMint,
      underlyingPool,
      poolAuthority,
      tokenProgram: TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([Config.ADMIN_KEYPAIR])
    .rpc();
  console.log(`Transaction completed successfully: ${txHash}`);
}
