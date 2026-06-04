import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  requestTask,
  getMyRequests,
  getReceivedRequests,
  acceptRequest,
  rejectRequest,
} from "../controllers/request.controller.js";

const router = express.Router();

router.get("/received", protect, getReceivedRequests);
router.post("/:taskId", protect, requestTask);
router.get("/my-requests", protect, getMyRequests);
router.patch("/:requestId/accept", protect, acceptRequest);
router.patch("/:requestId/reject", protect, rejectRequest);

export default router;
