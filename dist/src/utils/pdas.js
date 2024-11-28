import { PublicKey } from '@solana/web3.js';
import Config from '../config.js';
export function getExpirationDataPda(underlyingMint, expiration, oracle) {
    return PublicKey.findProgramAddressSync([
        underlyingMint.toBuffer(),
        expiration.toArrayLike(Buffer, 'le', 8),
        oracle.toBuffer()
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}

//# sourceMappingURL=pdas.js.map