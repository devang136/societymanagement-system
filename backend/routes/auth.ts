import express, { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const MOCK_USER = {
  name: 'Moni Roy',
  role: 'User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MOCK_ADMIN = {
  name: 'Admin',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const MOCK_SECURITY = {
  name: 'Security Guard',
  role: 'security',
  avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const router = express.Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // For the test user
    if (email === 'user@gmail.com' && password === 'asdasd') {
      const token = jwt.sign(
        { email, role: 'User', name: MOCK_USER.name },
        process.env.JWT_SECRET!
      );
      res.json({ token, user: MOCK_USER });
      return;
    }

    // For the test admin
    if (email === 'admin@gmail.com' && password === 'asdasd') {
      const token = jwt.sign(
        { email, role: 'admin', name: MOCK_ADMIN.name },
        process.env.JWT_SECRET!
      );
      res.json({ token, user: MOCK_ADMIN });
      return;
    }

    // For the test security guard
    if (email === 'security@gmail.com' && password === 'asdasd') {
      const token = jwt.sign(
        { email, role: 'security', name: MOCK_SECURITY.name },
        process.env.JWT_SECRET!
      );
      res.json({ token, user: MOCK_SECURITY });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 