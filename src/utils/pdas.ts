import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import Config from '../config.js';

export function getExpirationDataPda(
  underlyingMint: PublicKey,
  expiration: BN,
  oracle: PublicKey,
) {
  return PublicKey.findProgramAddressSync(
    [
      underlyingMint.toBuffer(),
      expiration.toArrayLike(Buffer, 'le', 8),
      oracle.toBuffer(),
    ],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}
