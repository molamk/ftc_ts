import { fmtErr } from '../../helpers';
import {
  CustomAvailability,
  ICustomAvailability,
  ICustomAvailabilityModel
} from './custom_avs.model';

export const getCustomAvById = (id: string) =>
  new Promise<ICustomAvailabilityModel>((resolve, reject) => {
    CustomAvailability.findById(id)
      .then(av => {
        if (av) {
          resolve(av);
        } else {
          reject(fmtErr('Custom availability not found', 404));
        }
      })
      .catch(reject);
  });

export const getCustomAvByTimestamps = ({ start, end, userId }: ICustomAvailability) =>
  CustomAvailability.find({ userId, start: { $gte: start }, end: { $lte: end } });

export const createCustomAv = ({ start, end, userId }: ICustomAvailability) =>
  CustomAvailability.create({
    end,
    start,
    userId
  });

export interface IUpdateCustomAv {
  id: string;
  end: number;
  start: number;
}

export const updateCustomAv = ({ id, start, end }: IUpdateCustomAv) =>
  new Promise((resolve, reject) => {
    CustomAvailability.findById(id)
      .then(av => {
        if (!av) {
          reject(fmtErr('Custom availability not found', 404));
        } else {
          av.start = start;
          av.end = end;

          av.save()
            .then(resolve)
            .catch(reject);
        }
      })
      .catch(reject);
  });

export const deleteCustomAv = (id: string) => CustomAvailability.deleteOne({ _id: id });
