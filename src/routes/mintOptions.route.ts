import {
  startMintingOptions,
  getMintOptions,
} from '../controllers/mintOptions.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getMintOptions);
router.post('/', startMintingOptions);

export default router;
