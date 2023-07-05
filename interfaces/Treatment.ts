import mongoose, { Document } from "mongoose";
import { IAnimal } from "./Animals";

export interface ITreatment extends Document {
    animalId: IAnimal['_id'];
    veterinarianId: mongoose.Types.ObjectId;
    date: Date;
    treatmentDescription: string;
}