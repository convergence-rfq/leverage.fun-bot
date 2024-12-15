import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import Config from '../config.js';
import { serializeStrikePrices } from './index.js';
export function getExpirationDataPda(underlyingMint, expiration, oracle) {
    return PublicKey.findProgramAddressSync([
        underlyingMint.toBuffer(),
        expiration.toArrayLike(Buffer, 'le', 8),
        oracle.toBuffer()
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getEuroMetaPda(underlyingMint, quoteMint, expiration, optionType, underlyingPool, strikePrices) {
    return PublicKey.findProgramAddressSync([
        underlyingMint.toBuffer(),
        quoteMint.toBuffer(),
        expiration.toArrayLike(Buffer, 'le', 8),
        new BN(optionType).toArrayLike(Buffer, 'le', 1),
        underlyingPool.toBuffer(),
        serializeStrikePrices(strikePrices)
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getOptionMintPda(euroMeta) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        euroMeta.toBuffer(),
        textEncoder.encode('optionMint')
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getWriterMintPda(euroMeta) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        euroMeta.toBuffer(),
        textEncoder.encode('writerMint')
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getUnderlyingPoolPda(underlyingMint) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        underlyingMint.toBuffer(),
        textEncoder.encode('underlyingPool')
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getQuotePoolPda(quoteMint) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        quoteMint.toBuffer(),
        textEncoder.encode('stablePool')
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getPoolAuthorityPda() {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        textEncoder.encode('poolAuthority')
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
}
export function getOptionCyclePda(vaultAuthority, cycleNumber) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        textEncoder.encode('option_cycle'),
        vaultAuthority.toBuffer(),
        cycleNumber.toArrayLike(Buffer, 'le', 8)
    ], Config.VAULTS_PROGRAM_ID);
}
export function getAuctionProgramVaultPda(auction) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        textEncoder.encode('vault'),
        auction.toBuffer()
    ], Config.AUCTION_PROGRAM_ID);
}
export function getAuctionStatePda(creator, cycleNumber) {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        textEncoder.encode('auction'),
        creator.toBuffer(),
        cycleNumber.toArrayLike(Buffer, 'le', 8)
    ], Config.AUCTION_PROGRAM_ID);
}
export function getPoolAuthorityVaultsPda() {
    const textEncoder = new TextEncoder();
    return PublicKey.findProgramAddressSync([
        textEncoder.encode('pool_authority')
    ], Config.VAULTS_PROGRAM_ID);
}

//# sourceMappingURL=pdas.js.map