import * as anchor from '@coral-xyz/anchor';
import Config from '../config.js';
export async function getProgram(provider) {
    try {
        const pid = Config.LEVERAGE_FUN_PROGRAM_ID;
        const idl = await anchor.Program.fetchIdl(pid, provider);
        const program = new anchor.Program(idl, provider);
        return program;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//# sourceMappingURL=programUtils.js.map