import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const isAdminHeader = req.header('x-admin');
  if (isAdminHeader === 'true') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
}
