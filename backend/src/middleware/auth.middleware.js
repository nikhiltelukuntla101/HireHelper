import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { findUserById } from "../repositories/user.repository.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Not authorized. No token provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

export default protect;
