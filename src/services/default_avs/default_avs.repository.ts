import { addToUnix, fmtErr, TimeInterval, timeToUnix } from '../../helpers';
import {
  DefaultAvailability,
  IDefaultAvailability,
  IDefaultAvailabilityModel
} from './default_avs.model';

export const getDefaultAvByUserId = (userId: string) => DefaultAvailability.find({ userId });

export const getDefaultAvById = (id: string) =>
  new Promise<IDefaultAvailabilityModel>((resolve, reject) => {
    DefaultAvailability.findById(id)
      .then(av => {
        if (av) {
          resolve(av);
        } else {
          reject(fmtErr('Default availability not found', 404));
        }
      })
      .catch(reject);
  });

export interface IGetDefaultAvByTmp {
  userId: string;
  start: number;
  end: number;
}

export interface IProjectedDefaultAv {
  id: string;
  start: number;
  end: number;
  userId: string;
}

export const getDefaultAvsByTmp = ({ userId, start, end }: IGetDefaultAvByTmp) =>
  new Promise<IProjectedDefaultAv[]>((resolve, reject) => {
    DefaultAvailability.find({ userId })
      .then(avs => {
        if (avs.length === 0) {
          return resolve([]);
        }

        const startDate = new Date(start * 1000);
        // const endDate = new Date(end * 1000);

        const projectedAvs: IProjectedDefaultAv[] = [];

        let baseAvs: IProjectedDefaultAv[] = avs
          .map(av => ({
            end: timeToUnix(av.end, av.day, startDate),
            id: av._id,
            start: timeToUnix(av.start, av.day, startDate),
            userId: av.userId
          }))
          .sort((a, b) => a.end - b.end);

        while (baseAvs[baseAvs.length - 1].end <= end) {
          projectedAvs.push(...baseAvs.filter(av => av.start >= start && av.end <= end));
          baseAvs = baseAvs.map(b => ({
            ...b,
            end: addToUnix(b.end, TimeInterval.WEEK, 1),
            start: addToUnix(b.start, TimeInterval.WEEK, 1)
          }));
        }

        resolve(projectedAvs);
      })
      .catch(reject);
  });

export const createDefaultAv = ({ day, start, end, userId }: IDefaultAvailability) =>
  DefaultAvailability.create({
    day,
    end,
    start,
    userId
  });

export interface IUpdateDefaultAv {
  id: string;
  start: number;
  end: number;
}

export const updateDefaultAv = ({ id, start, end }: IUpdateDefaultAv) =>
  new Promise((resolve, reject) => {
    DefaultAvailability.findById(id)
      .then(av => {
        if (!av) {
          reject(fmtErr('Default availability not found', 404));
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

export const deleteDefaultAv = (id: string) => DefaultAvailability.deleteOne({ _id: id });
