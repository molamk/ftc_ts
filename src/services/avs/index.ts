import { Router } from 'express';
import { getByParams } from './avs.controller';

const router = Router();

router.get('/', getByParams);

export default router;
