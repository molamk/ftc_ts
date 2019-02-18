import { Router } from 'express';
import { get } from './health_check.controller';

const router = Router();
router.get('/', get);

export default router;
