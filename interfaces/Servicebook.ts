import { Document } from "mongoose";

export interface ISpace extends Document {
  spaceId: string;
  rateFrequency: number;
  lastMaintenance: Date;
}
