import express from 'express';
import authRouter from './modules/auth';
import { auth, isAdmin } from './middleware/auth';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

app.get('/api/me', auth, (req, res) => {
  res.json({ user: (req as any).user });
});

app.get('/api/admin', auth, isAdmin, (_req, res) => {
  res.json({ message: 'Admin access granted' });
});

export default app;
