import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';

import Cookie from 'cookies';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    // make use of body to check for errors
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must between 4 and 20 characters'),
  ],
  //   validationResult inspects the request because there will be stuff appended to it
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    // if not existingUser will be null
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use ');
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // ! this variable is 100% defined
      process.env.JWT_KEY!
    );

    res.status(201).send(userJwt);
  }
);

export { router as signupRouter };
