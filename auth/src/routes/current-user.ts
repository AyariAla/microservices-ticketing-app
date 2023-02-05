import express from 'express';
// import { currentuserHandler } from '../middlewares/current-user-handler';
// Before publishing common package
import { currentuserHandler } from '@alaaytickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentuserHandler, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
