import { Request, Response, NextFunction } from 'express';

export interface LoggedRequest extends Request {
  log?: string;
}

export function logger(req: LoggedRequest, _res: Response, next: NextFunction): void {
  req.log = `Called ${req.method} ${req.path}`;
  next();
}
