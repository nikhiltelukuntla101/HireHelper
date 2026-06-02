import { registerUser } from "../services/auth.service.js";
import { verifyOTPService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { loginUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful. OTP sent to your email.",
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  await verifyOTPService(email, otp);

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  });
});
