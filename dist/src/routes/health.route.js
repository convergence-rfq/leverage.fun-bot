import { Router } from 'express';
const router = Router();
router.get('/', (_req, res)=>{
    res.status(200).json({
        message: 'OK'
    });
});
export default router;

//# sourceMappingURL=health.route.js.map