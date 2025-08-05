import express from 'express';

const app = express();

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

export default app;

