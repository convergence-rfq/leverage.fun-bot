import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import Config from '../config.js';
import { OptionTypeV2, serializeStrikePrices } from './index.js';

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

export function getEuroMetaPda(
  underlyingMint: PublicKey,
  quoteMint: PublicKey,
  expiration: BN,
  optionType: OptionTypeV2,
  underlyingPool: PublicKey,
  strikePrices: BN[],
) {
  return PublicKey.findProgramAddressSync(
    [
      underlyingMint.toBuffer(),
      quoteMint.toBuffer(),
      expiration.toArrayLike(Buffer, 'le', 8),
      new BN(optionType as number).toArrayLike(Buffer, 'le', 1),
      underlyingPool.toBuffer(),
      serializeStrikePrices(strikePrices),
    ],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}

export function getOptionMintPda(euroMeta: PublicKey) {
  const textEncoder = new TextEncoder();
  return PublicKey.findProgramAddressSync(
    [euroMeta.toBuffer(), textEncoder.encode('optionMint')],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}

export function getWriterMintPda(euroMeta: PublicKey) {
  const textEncoder = new TextEncoder();
  return PublicKey.findProgramAddressSync(
    [euroMeta.toBuffer(), textEncoder.encode('writerMint')],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}

export function getUnderlyingPoolPda(underlyingMint: PublicKey) {
  const textEncoder = new TextEncoder();
  return PublicKey.findProgramAddressSync(
    [underlyingMint.toBuffer(), textEncoder.encode('underlyingPool')],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}

export function getQuotePoolPda(quoteMint: PublicKey) {
  const textEncoder = new TextEncoder();
  return PublicKey.findProgramAddressSync(
    [quoteMint.toBuffer(), textEncoder.encode('stablePool')],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}

export function getPoolAuthorityPda() {
  const textEncoder = new TextEncoder();
  return PublicKey.findProgramAddressSync(
    [textEncoder.encode('poolAuthority')],
    Config.LEVERAGE_FUN_PROGRAM_ID,
  );
}
