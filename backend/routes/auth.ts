import express from 'express';

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

export { MOCK_USER, MOCK_ADMIN, MOCK_SECURITY };
export default router; 