import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:notification/read", protect, markNotificationAsRead);

export default router;
