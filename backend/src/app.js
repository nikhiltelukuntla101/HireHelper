import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import protect from "./middleware/auth.middleware.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

console.log("APP.JS LOADED");
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/tasks", taskRoutes);

app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "Test Route Works",
  });
});
app.get("/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user,
  });
});

app.use(errorHandler);

export default app;
