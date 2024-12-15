import * as anchor from '@coral-xyz/anchor';
import { EuroPrimitive } from '../types/euro_primitive.js';
import { Vaults } from '../types/vaults.js';
import { OptionAuction } from '../types/option_auction.js';
import Config from '../config.js';

export async function getProgram(
  provider: anchor.Provider,
): Promise<anchor.Program<EuroPrimitive>> {
  try {
    const pid = Config.LEVERAGE_FUN_PROGRAM_ID;
    const idl = await anchor.Program.fetchIdl<EuroPrimitive>(pid, provider);
    const program = new anchor.Program<EuroPrimitive>(idl!, provider);
    return program;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVaultsProgram(
  provider: anchor.Provider,
): Promise<anchor.Program<Vaults>> {
  try {
    const pid = Config.VAULTS_PROGRAM_ID;
    const idl = await anchor.Program.fetchIdl<Vaults>(pid, provider);
    const program = new anchor.Program<Vaults>(idl!, provider);
    return program;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAuctionProgram(
  provider: anchor.Provider,
): Promise<anchor.Program<OptionAuction>> {
  const pid = Config.AUCTION_PROGRAM_ID;
  const idl = await anchor.Program.fetchIdl<OptionAuction>(pid, provider);
  const program = new anchor.Program<OptionAuction>(idl!, provider);
  return program;
}
