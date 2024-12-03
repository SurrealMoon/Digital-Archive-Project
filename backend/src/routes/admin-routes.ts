import express from 'express';
import { loginAdmin } from '../controllers/login-controller';

const router = express.Router();

// Admin Login Route
router.post('/login', loginAdmin);

export default router;
