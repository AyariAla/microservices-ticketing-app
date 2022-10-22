import { Express } from 'express-serve-static-core';
import { IUserPayload } from '../IUserPayload';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: IUserPayload;
  }
}
// declare global {
//   namespace Express {
//     interface Request {
//       user?: Record<string,any>
//     }
//   }
// }
