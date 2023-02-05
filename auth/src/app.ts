import express from 'express';
import 'express-async-errors';

import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/singout';
// import { errorHandler } from './middlewares/errror-handler';
// import { NotFoundError } from './errors/not-found-error';
import { errorHandler, NotFoundError } from '@alaaytickets/common';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import { isPropertyAccessChain } from 'typescript';
const app = express();
// traffic is being proxied to the app through ingress nginx and express will not trust the connection because of the proxy
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    signed: false,
    // secure: false,
    secure: process.env.NODE_ENV !=='test',
  })
);

app.use(cookieParser());

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export { app };
