import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByEmailWithOTP = async (email) => {
  return await User.findOne({ email }).select("+otp +otpExpiry");
};

export const findUserByEmailWithPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
  return await User.findById(id);
};
