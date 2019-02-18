import { Document, model, Schema } from 'mongoose';

export interface ICustomAvailability {
  start: number;
  end: number;
  userId: string;
}

export interface ICustomAvailabilityModel extends ICustomAvailability, Document {}

const customAvailabilitySchema = new Schema(
  {
    end: Number,
    start: Number,
    userId: String
  },
  { timestamps: true }
);

export const CustomAvailability = model<ICustomAvailabilityModel>(
  'CustomAvailability',
  customAvailabilitySchema
);
