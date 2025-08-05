import express from 'express';
import quotationsRouter from './modules/quotations/quotations.route';

const app = express();

app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

app.use('/api/quotations', quotationsRouter);

export default app;

