import mongoose, { Document } from 'mongoose';
import { SpacesInterface } from './space';

export interface AnimalInterface extends Document {
    name: string;
    species: string;
    age: number;
    healthStatus: string;
    treatments: mongoose.Types.ObjectId[];
    spaceId: SpacesInterface['_id'];
}

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    healthStatus: {
        type: String,
        required: true,
    },
    treatments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
    }],
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spaces',
        required: true,
    },
});

export default mongoose.model<AnimalInterface>('Animal', animalSchema);
