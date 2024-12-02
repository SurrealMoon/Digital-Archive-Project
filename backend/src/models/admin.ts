import mongoose, { Document, Model, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

// Admin interface
interface IAdmin extends Document {
  _id: ObjectId; // `_id`'nin ObjectId olduğunu belirtiyoruz.
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Admin schema
const adminSchema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Şifre hashleme
adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifre doğrulama metodu
adminSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Admin modeli
const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
