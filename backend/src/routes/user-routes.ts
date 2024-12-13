import express from "express";
import { loginLawyer, logoutUser } from "../controllers/login-controller"; // Logout fonksiyonu


const router = express.Router();

// Lawyer Login Route
router.post("/login", loginLawyer);
router.post("/logout", logoutUser);


export default router;
