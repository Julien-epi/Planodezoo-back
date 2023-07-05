import mongoose, { Document } from "mongoose";

export interface ServicebookInterface extends Document {
  spaceId: string;
  rateFrequency: number;
  lastMaintenance: Date;
}

const servicebookschema = new mongoose.Schema({
  spaceId: {
    type: String,
    required: true,
  },
  rateFrequency: {
    type: Number,
    required: true,
  },
  lastMaintenance: {
    type: Date,
  },
});

export default mongoose.model<ServicebookInterface>("Servicebook", servicebookschema);
