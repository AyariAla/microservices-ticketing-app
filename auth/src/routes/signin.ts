import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
// import { BadRequestError } from '../errors/bad-request-error';
// import { validateRequest } from '../middlewares/validate-requests';
// Before
import { BadRequestError, validateRequest } from '@alaaytickets/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { Session } from 'express-session';
export interface ISession extends Session {
  jwt?: string;
}

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid !'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials !');
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials !');
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // ! this variable is 100% defined
      process.env.JWT_KEY!,
      { expiresIn: '1h' }
    );
    (req.session as ISession).jwt = userJwt;
    res.status(200).send({
      user: existingUser,
    });
  }
);

export { router as signinRouter };
