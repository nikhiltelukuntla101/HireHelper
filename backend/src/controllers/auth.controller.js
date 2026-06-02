import { registerUser } from "../services/auth.service.js";
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
