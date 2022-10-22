import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Response,
  res: Request,
  next: NextFunction
) => {
  if (!req.curre) {
    return res.status(401).send({});
  }
};
