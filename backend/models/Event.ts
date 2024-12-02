import mongoose, { Document } from 'mongoose';

export interface IEvent extends Document {
  participator: {
    name: string;
    avatar: string;
  };
  description: string;
  activityTime: string;
  activityDate: string;
  activityName: string;
  participants: {
    userId: mongoose.Types.ObjectId;
    registeredAt: Date;
  }[];
}

const eventSchema = new mongoose.Schema<IEvent>({
  participator: {
    name: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  description: { type: String, required: true },
  activityTime: { type: String, required: true },
  activityDate: { type: String, required: true },
  activityName: { type: String, required: true },
  participants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    registeredAt: { type: Date, default: Date.now }
  }]
});

export const Event = mongoose.model<IEvent>('Event', eventSchema); 