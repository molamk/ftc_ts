import { Document, model, Schema } from 'mongoose';

export interface IUnavailability {
  start: number;
  end: number;
  userId: string;
}

export interface IUnavailabilityModel extends IUnavailability, Document {}

const UnavailabilitySchema = new Schema(
  {
    end: Number,
    start: Number,
    userId: String
  },
  { timestamps: true }
);

export const Unavailability = model<IUnavailabilityModel>('Unavailability', UnavailabilitySchema);
