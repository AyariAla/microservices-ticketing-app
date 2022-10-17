import express, { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).send(errors.array());
      // //   take error object and make it into array
      throw new RequestValidationError(errors.array());
    }

    // console.log('Creating a user');
    // throw new DatabaseConnectionError();
    // res.send('Sign up router');
  }
);

export { router as signupRouter };
