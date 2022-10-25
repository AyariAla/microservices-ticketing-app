import express from 'express';
import { ISession } from '../types/ISession';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  // with cookies session it's gonna be req.session= null
  // if (req.session) {
  //   // (req.session as ISession).jwt = '';
  //   // req.session.destroy(function (err) {});
  // }
  res.send({});
});

export { router as signoutRouter };
