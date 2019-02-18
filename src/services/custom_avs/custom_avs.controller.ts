import { Request, Response } from 'express';
import { isValidTimestampDuration, sendErr } from '../../helpers';
import { createCustomAv, deleteCustomAv, getCustomAvById, getCustomAvByTimestamps, updateCustomAv } from './custom_avs.repository';

export const getByParams = (req: Request, res: Response) => {
  const { user_id: userId, start, end } = req.query;
  const isValidInput = userId && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('User ID is required');
  }
  return getCustomAvByTimestamps({ userId, start, end })
    .then(avs => res.send(avs))
    .catch(sendErr(res));
};

export const get = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Availability ID is required');
  }
  return getCustomAvById(id)
    .then(av => res.send(av))
    .catch(sendErr(res));
};

export const create = (req: Request, res: Response) => {
  const { start, end, user_id: userId } = req.body;
  const isValidInput = userId && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid JSON to create Availability');
  }
  return createCustomAv({
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
  const isValidInput = id && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid JSON to update Availability');
  }
  return updateCustomAv({ id, start, end })
    .then(() => res.sendStatus(200))
    .catch(sendErr(res));
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Availability ID is required');
  }
  return deleteCustomAv(id)
    .then(() => res.sendStatus(200))
    .catch(sendErr(res));
};
