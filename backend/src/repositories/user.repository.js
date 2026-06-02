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
