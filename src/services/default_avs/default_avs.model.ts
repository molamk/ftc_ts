import { Document, model, Schema } from 'mongoose';

export interface IDefaultAvailability {
  day: number;
  end: number;
  start: number;
  userId: string;
}

export interface IDefaultAvailabilityModel extends IDefaultAvailability, Document {}

const defaultAvailabilitySchema = new Schema(
  {
    day: Number,
    end: Number,
    start: Number,
    userId: String
  },
  { timestamps: true }
);

export const DefaultAvailability = model<IDefaultAvailabilityModel>(
  'DefaultAvailability',
  defaultAvailabilitySchema
);
