import { Document } from "mongoose";

export interface ISpace extends Document {
  name: string;
  description: string;
  images: string;
  type: string;
  capacity: number;
  duration: number;
  openingHours: string;
  handicappedAccess: boolean;
  status: boolean;
  lastMaintenance: Date;
}
