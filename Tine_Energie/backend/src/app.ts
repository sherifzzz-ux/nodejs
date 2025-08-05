import express from 'express';
import { getGreeting } from './services/greetingService';
import { logger } from './middlewares/logger';

const app = express();

app.use(logger);

app.get('/api/hello', (req, res) => {
  const name = req.query.name as string | undefined;
  res.json({ message: getGreeting(name) });
});

export default app;
