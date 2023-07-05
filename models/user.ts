import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

// Étendre votre UserSchema pour inclure le champ assignedDays
const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  assignedDays: { type: [String], required: false }, // Ce champ est optionnel car tous les utilisateurs ne sont pas des employés
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
