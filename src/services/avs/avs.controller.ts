import { Request, Response } from 'express';
import { isValidTimestampDuration, sendErr } from '../../helpers';
import { getTrainerAvsByTimestamps } from './avs.repository';

export const getByParams = (req: Request, res: Response) => {
  let { start, end } = req.query;
  const { user_id: userId } = req.query;

  try {
    start = parseInt(start, 10);
    end = parseInt(end, 10);
  } catch (err) {
    return res.status(400).send('Invalid parameters to get Availabilities');
  }

  const isValidInput = userId && isValidTimestampDuration(start, end);
  // tslint:disable-next-line: no-console
  console.log({ isValidInput });

  if (!isValidInput) {
    return res.status(400).send('Invalid parameters to get Availabilities');
  }

  return getTrainerAvsByTimestamps({ userId, start, end })
    .then(avs => res.send(avs))
    .catch(sendErr(res));
};
