import express from "express";
import { loginLawyer, logoutUser, refreshAccessToken } from "../controllers/login-controller"; // Logout fonksiyonu


const router = express.Router();

// Lawyer Login Route
router.post("/login", loginLawyer);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshAccessToken);



export default router;
