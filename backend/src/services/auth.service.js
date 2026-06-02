import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";

import {
  findUserByEmail,
  findUserByPhone,
  createUser,
} from "../repositories/user.repository.js";

import generateOtp from "../utils/generateOtp.js";

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

  return user;
};
