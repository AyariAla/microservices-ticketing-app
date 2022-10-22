import express from 'express';
import jwt from 'jsonwebtoken';
import { currentuserHandler } from '../middlewares/current-user-handler';
import { ISession } from '../types/ISession';
const router = express.Router();

router.get('/api/users/currentuser', currentuserHandler, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
