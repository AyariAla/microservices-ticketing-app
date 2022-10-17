import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
export class RequestValidationError extends CustomError {
  statusCode = 400;
  // assigning errors as a attribute of this class
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    // Only because I'm extending a built in TS class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
