import { fmtErr } from '../../helpers';
import { IUnavailability, IUnavailabilityModel, Unavailability } from './unavailabilities.model';

export const getUnavById = (id: string) =>
  new Promise<IUnavailabilityModel>((resolve, reject) => {
    Unavailability.findById(id)
      .then(av => {
        if (av) {
          resolve(av);
        } else {
          reject(fmtErr('Custom availability not found', 404));
        }
      })
      .catch(reject);
  });

export const getUnavByTimestamps = ({ start, end, userId }: IUnavailability) =>
  Unavailability.find({ userId, start: { $gte: start }, end: { $lte: end } });

export const createUnav = ({ start, end, userId }: IUnavailability) =>
  Unavailability.create({
    end,
    start,
    userId
  });
