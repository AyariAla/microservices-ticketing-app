import express from 'express';
import { currentuserHandler } from '../middlewares/current-user-handler';

const router = express.Router();

router.get('/api/users/currentuser', currentuserHandler, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
