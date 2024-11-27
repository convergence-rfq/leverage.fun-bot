import * as anchor from '@coral-xyz/anchor';
import { EuroPrimitive } from '../types/euro_primitive.js';
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
