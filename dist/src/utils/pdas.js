import { PublicKey } from '@solana/web3.js';
import Config from '../config';
export function getExpirationDataPda(underlyingMint, expiration, oracle) {
    return PublicKey.findProgramAddressSync([
        Buffer.from('expiration'),
        underlyingMint.toBuffer(),
        Buffer.from(expiration.toString()),
        oracle.toBuffer()
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}

//# sourceMappingURL=pdas.js.map