import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/singout';
import { errorHandler } from './middlewares/errror-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// traffic is being proxied to the app through ingress nginx and express will not trust the connection because of the proxy
app.set('trust proxy', 1);
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined ');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};
start();
