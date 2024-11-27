import * as pdas from './pdas.js';
import * as programUtils from './programUtils.js';
import axios from 'axios';
import Config from '../config.js';

export { pdas, programUtils };

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function postTelegramMessage(txHash: string) {
  const url = `https://api.telegram.org/bot${Config.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const message = `Minted call option via Leverage.fun expiring in 1 hour. Explorer: [tx link](https://eclipsescan.xyz/tx/${txHash}?cluster=testnet)`;

  const payload = {
    chat_id: Config.TELEGRAM_CHANNEL_ID,
    text: message,
    parse_mode: 'Markdown',
  };

  await axios.post(url, payload);
}
