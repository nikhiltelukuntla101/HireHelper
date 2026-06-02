import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();
console.log("SERVER FILE LOADED");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
