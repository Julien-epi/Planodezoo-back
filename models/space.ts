import mongoose, { Document } from "mongoose";

export interface SpacesInterface extends Document {
  name?: string;
  description?: string;
  images?: string;
  type?: string;
  capacity?: number;
  duration?: number;
  openingHours?: string;
  handicappedAccess?: boolean;
  lastMaintenance?: Date;
  status?: boolean;
}

const spaceschema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  images: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  capacity: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  openingHours: {
    type: String,
    required: false,
  },
  handicappedAccess: {
    type: Boolean,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
  lastMaintenance: {
    type: String,
  },
});

export default mongoose.model<SpacesInterface>("Spaces", spaceschema);
