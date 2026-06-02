import { body } from "express-validator";

export const registerValidator = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("email").trim().isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("phone")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid Indian phone number"),
];
