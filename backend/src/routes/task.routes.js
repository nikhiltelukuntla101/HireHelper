import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createTask,
  getMyTasks,
  getFeedTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();
console.log("TASK ROUTES LOADED");
router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.get("/feed", protect, getFeedTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
