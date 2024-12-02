import mongoose, { Document, ObjectId } from 'mongoose';

// Admin interface
interface IAdmin extends Document {
  _id: ObjectId; // `_id`'nin ObjectId olduğunu belirtiyoruz.
  username: string;
  password: string;
}

// Admin schema
const adminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Admin modeli
const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
