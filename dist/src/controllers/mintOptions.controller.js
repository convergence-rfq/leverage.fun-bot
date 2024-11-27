import { PublicKey } from '@solana/web3.js';
import Config from '../config';
async function getMintOptions(_req, res) {
    res.send('Cannot GET /mint-options');
}
async function startMintingOptions(_req, res) {
    const [_expirationData, _expirationDataBump] = PublicKey.findProgramAddressSync([
        Buffer.from('expiration'),
        Config.ADMIN_KEYPAIR.publicKey.toBuffer()
    ], Config.LEVERAGE_FUN_PROGRAM_ID);
    res.send('Cannot POST /mint-options');
}
export { getMintOptions, startMintingOptions };

//# sourceMappingURL=mintOptions.controller.js.map