import express from "express";
import { loginLawyer } from "../controllers/login-controller";

const router = express.Router();

// Lawyer Login Route
router.post("/login", loginLawyer);

export default router;
