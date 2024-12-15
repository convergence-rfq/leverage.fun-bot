import * as pdas from './pdas.js';
import * as programUtils from './programUtils.js';
// import * as anchor from '@coral-xyz/anchor';
import axios from 'axios';
import Config from '../config.js';
import BN from 'bn.js';
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

export { pdas, programUtils };

const connection = new Connection(Config.TESTNET_RPC_URL, 'confirmed');

export enum OptionTypeV2 {
  CALL = 0,
  PUT = 1,
  LONG_CALL_SPREAD = 2,
  LONG_PUT_SPREAD = 3,
}

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
export const serializeStrikePrices = (strikePrices: BN[]) => {
  let buffer = Buffer.from([]);
  strikePrices.forEach(async value => {
    const newBuffer = value.toArrayLike(Buffer, 'le', 8);
    // @ts-expect-error idk why this shows an error
    buffer = Buffer.concat([buffer, newBuffer]);
  });
  return buffer;
};

export async function getAtaForUser(
  optionMint: PublicKey,
  writerMint: PublicKey,
  underlyingMint: PublicKey,
  accountOwner: PublicKey,
  allowOwnerOffCurve: boolean = false,
) {
  try {
    console.log('Getting ATAs');

    const optionMintAta = getAssociatedTokenAddressSync(
      optionMint,
      accountOwner,
      allowOwnerOffCurve,
    );
    const writerMintAta = getAssociatedTokenAddressSync(
      writerMint,
      accountOwner,
      allowOwnerOffCurve,
    );
    const underlyingMintAta = getAssociatedTokenAddressSync(
      underlyingMint,
      accountOwner,
      allowOwnerOffCurve,
    );

    console.log('optionMint:', optionMint.toBase58());
    console.log('writerMint:', writerMint.toBase58());
    console.log('underlyingMint:', underlyingMint.toBase58());

    // Validate that the provided addresses are actually token mints
    const mintInfos = await connection.getMultipleAccountsInfo([
      optionMint,
      writerMint,
      underlyingMint,
    ]);

    if (mintInfos.some(info => !info)) {
      console.error('One or more mint addresses are invalid, trying again...');
      await sleep(1000);
    }
    console.log('optionMintAta:', optionMintAta.toBase58());
    console.log('writerMintAta:', writerMintAta.toBase58());
    console.log('underlyingMintAta:', underlyingMintAta.toBase58());

    // Check if accounts exist first
    const accounts = await connection.getMultipleAccountsInfo([
      optionMintAta,
      writerMintAta,
      underlyingMintAta,
    ]);

    const tx = new Transaction();

    // Only create ATAs that don't exist
    if (!accounts[0]) {
      tx.add(
        createAssociatedTokenAccountInstruction(
          Config.ADMIN_KEYPAIR.publicKey,
          optionMintAta,
          accountOwner,
          optionMint,
        ),
      );
    }

    if (!accounts[1]) {
      tx.add(
        createAssociatedTokenAccountInstruction(
          Config.ADMIN_KEYPAIR.publicKey,
          writerMintAta,
          accountOwner,
          writerMint,
        ),
      );
    }

    if (!accounts[2]) {
      tx.add(
        createAssociatedTokenAccountInstruction(
          Config.ADMIN_KEYPAIR.publicKey,
          underlyingMintAta,
          accountOwner,
          underlyingMint,
        ),
      );
    }

    // Only send transaction if there are instructions to execute
    if (tx.instructions.length > 0) {
      const sig = await sendAndConfirmTransaction(connection, tx, [
        Config.ADMIN_KEYPAIR,
      ]);
      console.log('ATAs created:', sig);
    } else {
      console.log('All ATAs already exist');
    }

    return { optionMintAta, writerMintAta, underlyingMintAta };
  } catch (e) {
    console.error('Error in getAtaForUser:', e);
    return null;
  }
}
