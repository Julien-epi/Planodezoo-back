import mongoose, { Document } from "mongoose";
import { SpacesInterface } from "../models/space"

export interface IAnimal extends Document {
    name: string;
    species: string;
    age: number;
    healthStatus: string;
    treatments: mongoose.Types.ObjectId[];
    spaceId: SpacesInterface['_id'];
}