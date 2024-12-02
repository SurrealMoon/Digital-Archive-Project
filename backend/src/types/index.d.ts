import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Burada `any` yerine `Admin` veya uygun türü kullanabilirsiniz
    }
  }
}
