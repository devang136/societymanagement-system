import express, { Response, NextFunction } from 'express';
import { Event } from '../models/Event';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Get all events
router.get('/', authMiddleware, async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Get activities
router.get('/activities', authMiddleware, async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activities = await Event.find({ 
      type: { $exists: true },
      status: { $exists: true }
    });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// Participate in event
router.post('/:eventId/participate', authMiddleware, async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?._id) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const alreadyParticipating = event.participants?.some(
      p => p?.userId?.toString() === req.user?._id?.toString()
    );

    if (alreadyParticipating) {
      res.status(400).json({ message: 'Already registered for this event' });
      return;
    }

    event.participants.push({ 
      userId: new mongoose.Types.ObjectId(req.user._id),
      registeredAt: new Date()
    });
    await event.save();

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    next(error);
  }
});

export default router; 