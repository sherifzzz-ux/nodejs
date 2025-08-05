import express from 'express';
import messagesRouter from './modules/messages';

const app = express();

app.use(express.json());
app.use('/api/messages', messagesRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

export default app;

