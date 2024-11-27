import { startMintingOptions } from '../controllers/mintOptions.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/', startMintingOptions);

export default router;
