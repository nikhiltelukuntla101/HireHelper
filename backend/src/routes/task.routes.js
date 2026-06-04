import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createTask,
  getMyTasks,
  getFeedTasks,
} from "../controllers/task.controller.js";

const router = express.Router();
console.log("TASK ROUTES LOADED");
router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.get("/feed", protect, getFeedTasks);

export default router;
