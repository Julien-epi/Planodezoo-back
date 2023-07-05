import mongoose, { Document } from 'mongoose';
import { IAnimal } from "../interfaces/Animals";


export interface TreatmentInterface extends Document {
    animalId: IAnimal['_id'];
    veterinarianId: mongoose.Types.ObjectId;
    date: Date;
    treatmentDescription: string;
}

const treatmentSchema = new mongoose.Schema({
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    veterinarianId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    treatmentDescription: {
        type: String,
        required: true,
    },
});

export default mongoose.model<TreatmentInterface>('Treatment', treatmentSchema);
