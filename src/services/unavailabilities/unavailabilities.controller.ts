import { Request, Response } from 'express';
import { isValidTimestampDuration, sendErr } from '../../helpers';
import { createUnav, getUnavById, getUnavByTimestamps } from './unavailabilities.repository';

export const get = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('Unavailability ID is required');
  }

  return getUnavById(id)
    .then(unav => res.send(unav))
    .catch(sendErr(res));
};

export const getByParams = (req: Request, res: Response) => {
  const { user_id: userId, start, end } = req.query;
  const isValidInput = userId && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid parameters to get Unavailability');
  }

  return getUnavByTimestamps({ start, end, userId })
    .then(unavs => res.send(unavs))
    .catch(sendErr(res));
};

export const create = (req: Request, res: Response) => {
  const { user_id: userId, start, end } = req.body;
  const isValidInput = userId && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid JSON to create Unavailability');
  }

  return createUnav({ start, end, userId })
    .then(() => res.sendStatus(201))
    .catch(sendErr(res));
};
