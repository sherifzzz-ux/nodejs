import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../config/env';

interface User {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'admin';
}

const users: User[] = [];
let nextId = 1;

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = {
    id: nextId++,
    username,
    password: hashedPassword,
    role: role === 'admin' ? 'admin' : 'user',
  };
  users.push(user);
  return res.status(201).json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '1h' },
  );
  return res.json({ token });
});

export default router;
