import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import generateToken from "../utils/generateToken.js";
import { sendOtpEmail } from "./email.service.js";

import {
  findUserByEmail,
  findUserByPhone,
  createUser,
  findUserByEmailWithResetOtp,
} from "../repositories/user.repository.js";

import generateOtp from "../utils/generateOtp.js";
import {
  findUserByEmailWithOTP,
  findUserByEmailWithPassword,
} from "../repositories/user.repository.js";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  role,
}) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists with this email", 409);
  }
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    throw new AppError("Phone number already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const otp = generateOtp();

  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await createUser({
    firstName,
    lastName,
    email,
    phone,
    role,
    password: hashedPassword,
    otp,
    otpExpiry,
  });
  await sendOtpEmail(email, otp, firstName);

  return user;
};

export const verifyOTPService = async (email, enteredOtp) => {
  const user = await findUserByEmailWithOTP(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.isVerified) {
    throw new AppError("Account already verified", 400);
  }
  if (user.otp !== enteredOtp) {
    throw new AppError("Invalid OTP", 400);
  }
  if (user.otpExpiry < new Date()) {
    throw new AppError("OTP expired", 400);
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isVerified) {
    throw new AppError("Please verify your account first", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

export const resendOtpService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isVerified) {
    throw new AppError("Account already verified", 400);
  }

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOtpEmail(user.email, otp, user.firstName);
  return true;
};

export const forgotPasswordService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const otp = generateOtp();
  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendOtpEmail(user.email, otp, user.firstName);
};

export const resetPasswordService = async (email, otp, newPassword) => {
  const user = await findUserByEmailWithResetOtp(email);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.resetPasswordOtp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }

  if (user.resetPasswordOtpExpiry < new Date()) {
    throw new AppError("OTP expired", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;

  user.resetPasswordOtp = undefined;
  user.resetPasswordOtpExpiry = undefined;

  await user.save();
};
