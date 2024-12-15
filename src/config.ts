import 'dotenv/config';
import bs58 from 'bs58';
import { Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';

class Config {
  private static instance: Config | null = null;

  private constructor() {
    fs.writeFileSync('id.json', process.env.ADMIN_KEYPAIR!);
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  ENV = process.env.NODE_ENV;
  MONGO_URI =
    this.ENV === 'development'
      ? `${process.env.MONGO_URI_DEV}/local`
      : `${process.env.MONGO_URI_PROD}/prod`;
  PORT = process.env.PORT ?? 8080;
  TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
  ADMIN_KEYPAIR = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(process.env.ADMIN_KEYPAIR!)),
  );
  HONEYBADGER_API_KEY = process.env.HONEYBADGER_API_KEY;

  // Program IDs
  LEVERAGE_FUN_PROGRAM_ID = new PublicKey(
    'LfunVKmPLfejpbCXPnrLbjZr693RrgKHdQub2ge1ZC9',
  );
  TESTNET_QUOTE_MINT = new PublicKey(
    'Usdc4JrKXpnn45ZTXFTTgQwXYYis2QFvN4y5gn5Vyyp',
  );
  TESTNET_WETH_MINT = new PublicKey(
    'EthE8omBLMAmj63ca8p2VdZNfUzbi93gJmE2a2663PdN',
  );
  TESTNET_WETH_POOL = new PublicKey(
    'J6QSQw6bpF7PAADTJcoNxNFy8akWjrCHc4bxt2tmW3C5',
  );
  TESTNET_SOL_MINT = new PublicKey(
    'SoLcvuLp7S3wBXqoYDtqjnP9LpTdQb4nKXUG3GokYor',
  );
  TESTNET_JITOSOL_MINT = new PublicKey(
    'jSoL8KMdFq79mVCi5wXDXj3AHxhnZ2eD2e5uDyDJE4J',
  );
  TESTNET_ORACLE_PUBLIC_KEY = new PublicKey(
    '7aX1P1mNsPPjFbRmhTvthNh8ujtCgoc8keq8qcze1LN6',
  );

  TESTNET_RPC_URL = 'https://testnet.dev2.eclipsenetwork.xyz';

  SOLANA_DEVNET_RPC_URL = 'https://api.devnet.solana.com';

  SOLANA_DEVNET_ORACLE = new PublicKey(
    'HjsyECjkjTUX5tz6eKXcdJBGQuf1zYToPnxc4hY8w12f',
  );

  VAULTS_PROGRAM_ID = new PublicKey(
    'doVLtcguouVHW5c6odaNrbcHAUEd2fkMGxq28efDptj',
  );

  AUCTION_PROGRAM_ID = new PublicKey(
    'BTxfkFZ7bGfse162Tz3hHpd9NxJJxYrFMj63iFmVDs7i',
  );

  jsonToBs58(json: Array<number>) {
    return bs58.encode(json);
  }
}

export default Config.getInstance();
