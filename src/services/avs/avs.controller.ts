import { Request, Response } from 'express';
import { isValidTimestampDuration, sendErr } from '../../helpers';
import { getTrainerAvsByTimestamps } from './avs.repository';

export const getByParams = (req: Request, res: Response) => {
  const { user_id: userId, start, end } = req.query;
  const isValidInput = userId && isValidTimestampDuration(start, end);

  if (!isValidInput) {
    return res.status(400).send('Invalid parameters to get Availabilities');
  }

  return getTrainerAvsByTimestamps({ userId, start, end })
    .then(avs => res.send(avs))
    .catch(sendErr(res));
};
