import express from 'express';
import path from 'path';
import {
  publicRouter as projectsPublicRouter,
  adminRouter as projectsAdminRouter,
} from './modules/projects/projects.routes';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

app.use('/api/projects', projectsPublicRouter);
app.use('/api/admin/projects', projectsAdminRouter);

export default app;

