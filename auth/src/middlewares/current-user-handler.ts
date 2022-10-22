import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ISession } from '../types/ISession';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentuserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqSess = req.session as ISession;
  if (!reqSess?.jwt) {
    return next();
  }
  // let token = req.headers.authorization.split(' ');
  try {
    // const payload = jwt.verify(token[1], process.env.JWT_KEY!) as UserPayload;
    const token = (req.session as ISession).jwt;
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    req.currentUser = payload;
  } catch (error) {
    res.send({ currentUser: null });
  }
  next();
};
