import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { json } from 'body-parser';

// import { errorHandler } from './middlewares/errror-handler';
// import { NotFoundError } from './errors/not-found-error';
import { errorHandler, NotFoundError } from '@alaaytickets/common';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
const app = express();
// traffic is being proxied to the app through ingress nginx and express will not trust the connection because of the proxy
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: false,
  })
);

app.use(cookieParser());

app.use(json());

app.use(errorHandler);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined ');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI must be defined !');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};
start();
