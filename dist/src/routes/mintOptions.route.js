import { startMintingOptions } from '../controllers/mintOptions.controller.js';
import { getInitializePools } from '../controllers/initializePools.controller.js';
import { Router } from 'express';
const router = Router();
router.get('/', startMintingOptions);
router.get('/initialize', getInitializePools);
export default router;

//# sourceMappingURL=mintOptions.route.js.map