import { Router } from 'express';
import { create, get, getByParams, remove, update } from './default_avs.controller';

const router = Router();

router.get('/:id', get);
router.get('/', getByParams);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
