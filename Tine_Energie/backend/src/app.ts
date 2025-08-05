import express from 'express';
import machineRoutes from './modules/machines/machine.routes';

const app = express();

app.use(express.json());

app.use('/api/machines', machineRoutes);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

export default app;

