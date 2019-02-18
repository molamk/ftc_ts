import { Response } from 'express';

export const isNumber = (x: number | undefined) => x !== undefined && Number.isInteger(x);

export const isValidDay = (x: number | undefined) =>
  x !== undefined && isNumber(x) && x >= 0 && x <= 6;

export const isValidTime = (x: number | undefined) =>
  x !== undefined && isNumber(x) && x >= 0 && x < 24 * 60;

export const isValidTimeDuration = (start: number | undefined, end: number | undefined) =>
  start !== undefined &&
  end !== undefined &&
  isValidTime(start) &&
  isValidTime(end) &&
  end - start >= 60;

export const isValidTimeStamp = (x: number) => isNumber(x) && x > 0;

export const isValidTimestampDuration = (start: number, end: number) =>
  isValidTimeStamp(start) && isValidTimeStamp(end) && end - start >= 1000 * 60 * 60;

export const fmtErr = (message: string, code: number) =>
  new Error(JSON.stringify({ code, message }));

interface IErr {
  code: number;
  message: string;
}

export const sendErr = (res: Response) => (err: Error) => {
  try {
    const formattedErr = JSON.parse(err.message) as IErr;
    res.status(formattedErr.code).send(formattedErr.message);
  } catch (_) {
    res.status(400).send(err.message);
  }
};

export const dateToUnix = (d: Date) => d.getTime() / 1000;

export const unixToDate = (u: number) => new Date(u * 1000);

export const getMonthAndYearFromDate = (d: Date) => ({
  month: d.getMonth(),
  year: d.getFullYear()
});

export const getMinuteAndHourFromTime = (t: number) => ({
  hour: Math.floor(t / 60),
  minute: t % 60
});

export const timeToUnix = (time: number, day: number, date: Date) => {
  const { hour, minute } = getMinuteAndHourFromTime(time);
  const { month, year } = getMonthAndYearFromDate(date);
  const formattedDate = new Date(year, month, day, hour, minute);

  return dateToUnix(formattedDate);
};

export enum TimeInterval {
  SECOND = 1000,
  MINUTE = SECOND * 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24,
  WEEK = 7 * DAY
}

export const addToUnix = (unix: number, interval: TimeInterval, n: number) => unix + n * interval;
