import { startMintingOptions } from '../controllers/mintOptions.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', startMintingOptions);
export default router;
