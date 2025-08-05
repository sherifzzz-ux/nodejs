import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from './projects.controller';

const uploadDir = path.join(process.cwd(), 'uploads', 'projects');
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir });

export const publicRouter = Router();
publicRouter.get('/', listProjects);
publicRouter.get('/:id', getProject);

export const adminRouter = Router();
adminRouter.post('/', upload.array('images'), createProject);
adminRouter.put('/:id', upload.array('images'), updateProject);
adminRouter.delete('/:id', deleteProject);
