import { getCustomAvByTimestamps } from '../custom_avs/custom_avs.repository';
import { getDefaultAvsByTmp } from '../default_avs/default_avs.repository';
import { getUnavByTimestamps } from '../unavailabilities/unavailabilities.repository';

export interface IGetAvs {
  userId: string;
  start: number;
  end: number;
}

export enum AvCategory {
  DEFAULT = 'default',
  CUSTOM = 'custom',
  UNAVAILABILITY = 'unavailability'
}

export interface IStandardAvailability {
  id?: string;
  category: AvCategory;
  userId: string;
  start: number;
  end: number;
}

export const getTrainerAvsByTimestamps = ({ userId, start, end }: IGetAvs) =>
  new Promise<IStandardAvailability[]>((resolve, reject) => {
// tslint:disable-next-line: no-console
    console.log({ userId, start, end });
    getDefaultAvsByTmp({ userId, start, end })
      .then(def => {
        getCustomAvByTimestamps({ userId, start, end })
          .then(cus => {
            getUnavByTimestamps({ userId, start, end })
              .then(unav => {
                const defaultAvs: IStandardAvailability[] = def.map(d => ({
                  ...d,
                  category: AvCategory.DEFAULT
                }));

                const customAvs: IStandardAvailability[] = cus.map(c => ({
                  ...c,
                  category: AvCategory.CUSTOM
                }));

                const unavs: IStandardAvailability[] = unav.map(u => ({
                  ...u,
                  category: AvCategory.UNAVAILABILITY
                }));

                const avs = defaultAvs
                  .concat(customAvs)
                  .filter(
                    a =>
                      unavs.findIndex(
                        u =>
                          (u.start >= a.start && u.start <= a.end) ||
                          (u.end >= a.start && u.end <= a.end)
                      ) === -1
                  );

                resolve(avs);
              })
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
