import { Router } from 'express';
import { create, get, getByParams } from './unavailabilities.controller';

const router = Router();

router.get('/:id', get);
router.get('/', getByParams);
router.post('/', create);

export default router;
