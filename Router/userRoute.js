import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  updateProfile,
  updatePassword,
  getUserPortfolio,
  forgotPassword,
  resetPassword,
} from "../Controllers/userController.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/portfolio/me", getUserPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
