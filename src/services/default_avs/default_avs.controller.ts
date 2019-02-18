import { Request, Response } from 'express';
import { isValidDay, isValidTimeDuration, sendErr } from '../../helpers';
import {
  createDefaultAv,
  deleteDefaultAv,
  getDefaultAvById,
  getDefaultAvByUserId,
  updateDefaultAv
} from './default_avs.repository';

export const getByParams = (req: Request, res: Response) => {
  const { user_id: userId } = req.query;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }
  return getDefaultAvByUserId(userId)
    .then(avs => res.send(avs))
    .catch(sendErr(res));
};

export const get = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Availability ID is required');
  }
  return getDefaultAvById(id)
    .then(av => res.send(av))
    .catch(sendErr(res));
};

export const create = (req: Request, res: Response) => {
  const { day, start, end, user_id: userId } = req.body;
  const isValidInput = userId && isValidDay(day) && isValidTimeDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid JSON to create Availability');
  }
  return createDefaultAv({
    day,
    end,
    start,
    userId
  })
    .then(() => res.sendStatus(201))
    .catch(sendErr(res));
};

export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const { start, end } = req.body;
  const isValidInput = id && isValidTimeDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid JSON to update Availability');
  }
  return updateDefaultAv({ id, start, end })
    .then(() => res.sendStatus(200))
    .catch(sendErr(res));
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Availability ID is required');
  }
  return deleteDefaultAv(id)
    .then(() => res.sendStatus(200))
    .catch(sendErr(res));
};
