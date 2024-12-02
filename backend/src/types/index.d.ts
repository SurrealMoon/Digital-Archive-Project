import { Document } from 'mongoose'; // Mongoose belgesi için tür

declare global {
  namespace Express {
    interface Request {
      user?: Document | null; // Mongoose Document türü
    }
  }
}
