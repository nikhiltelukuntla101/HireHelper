import express from "express";
import {
  register,
  verifyOtp,
  login,
  getMe,
  resendOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import { registerValidator } from "../validators/auth.validator.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/resend-otp", resendOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
