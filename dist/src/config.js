import 'dotenv/config';
import bs58 from 'bs58';
import { Keypair, PublicKey } from '@solana/web3.js';
class Config {
    static instance = null;
    constructor(){}
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    ENV = process.env.NODE_ENV;
    MONGO_URI = this.ENV === 'dev' ? `${process.env.MONGO_URI_DEV}/local` : `${process.env.MONGO_URI_PROD}/prod`;
    PORT = 8000;
    TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
    ADMIN_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.ADMIN_KEYPAIR)));
    LEVERAGE_FUN_PROGRAM_ID = new PublicKey(process.env.LEVERAGE_FUN_PROGRAM_ID);
    jsonToBs58(json) {
        return bs58.encode(json);
    }
}
export default Config.getInstance();

//# sourceMappingURL=config.js.map