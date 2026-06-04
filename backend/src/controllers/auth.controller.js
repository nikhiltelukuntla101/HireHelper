import {
  registerUser,
  resendOtpService,
  verifyOTPService,
  resetPasswordService,
  forgotPasswordService,
  loginUser,
} from "../services/auth.service.js";

import asyncHandler from "../utils/asyncHandler.js";

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

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      profilePicture: req.user.profilePicture,
      isVerified: req.user.isVerified,
    },
  });
};

export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await resendOtpService(email);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await forgotPasswordService(email);

  res.status(200).json({
    success: true,
    message: "Password reset OTP sent successfully",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  await resetPasswordService(email, otp, newPassword);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
