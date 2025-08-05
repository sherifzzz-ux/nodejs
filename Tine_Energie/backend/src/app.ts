import express from 'express';
import quotationRouter from './modules/quotations';
import messageRouter from './modules/messages';

const app = express();

app.use(express.json());

app.use('/api/quotations', quotationRouter);
app.use('/api/messages', messageRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

export default app;
