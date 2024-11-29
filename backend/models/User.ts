import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  wing?: string;
  unit?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'User' },
  avatar: { type: String },
  wing: { type: String },
  unit: { type: String }
});

export const User = mongoose.model<IUser>('User', userSchema); 