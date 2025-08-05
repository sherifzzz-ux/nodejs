import { Request, Response } from 'express';
import * as service from './projects.service';

export function listProjects(_req: Request, res: Response) {
  res.json(service.list());
}

export function getProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const project = service.find(id);
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }
  res.json(project);
}

export function createProject(req: Request, res: Response) {
  const { name, description } = req.body;
  const files = req.files as Express.Multer.File[] | undefined;
  const images = files ? files.map((f) => f.filename) : [];
  const project = service.create({ name, description, images });
  res.status(201).json(project);
}

export function updateProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, description } = req.body;
  const files = req.files as Express.Multer.File[] | undefined;
  const images = files && files.length > 0 ? files.map((f) => f.filename) : undefined;
  const project = service.update(id, { name, description, images });
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }
  res.json(project);
}

export function deleteProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!service.remove(id)) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }
  res.status(204).send();
}
