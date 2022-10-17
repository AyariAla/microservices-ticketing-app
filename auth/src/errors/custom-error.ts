// abstract class is better than interface because it becomes a class when transpiled to JS
export abstract class CustomError extends Error {
  abstract statusCode: number;
  // you must have statusCode if you derive from custom error
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  // fct signature, you must have a methd like this too
  abstract serializeErrors(): { message: string; field?: string }[];
}
