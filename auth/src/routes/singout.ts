import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  // with cookies session it's gonna be req.session= null
  res.send({});
});

export { router as signoutRouter };
