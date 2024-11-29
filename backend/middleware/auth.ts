import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types';

interface AuthRequest extends Request {
  user?: IUser;
  params: Record<string, string>;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Your auth logic here
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export { authMiddleware, AuthRequest }; 