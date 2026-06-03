import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp, firstName) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "HireHelper Account Verification",
    html: `
      <h2>Welcome to HireHelper</h2>
      <p>Hello ${firstName},</p>
      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};
