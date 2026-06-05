import AppError from "../utils/AppError.js";
import {
  findTaskById,
  updateTaskStatus,
  updateTaskById,
} from "../repositories/task.repository.js";
import { findUserById } from "../repositories/user.repository.js";

import {
  createRequest,
  findRequestByTaskAndRequester,
  findRequestsByRequester,
  findReceivedRequests,
  findRequestById,
  updateRequestStatus,
  rejectOtherRequestsForTask,
} from "../repositories/request.repository.js";
import { createNotificationService } from "./notification.service.js";

export const createRequestService = async (taskId, requesterId) => {
  const requester = await findUserById(requesterId);

  if (requester.role !== "helper" && requester.role !== "both") {
    throw new AppError("Only helpers can request tasks", 403);
  }

  const task = await findTaskById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.owner.toString() === requesterId.toString()) {
    throw new AppError("You cannot request your own task", 400);
  }

  const existingRequest = await findRequestByTaskAndRequester(
    taskId,
    requesterId,
  );
  if (existingRequest) {
    throw new AppError("Request already sent", 400);
  }
  const request = await createRequest({
    task: taskId,
    requester: requesterId,
  });
  await createNotificationService(
    task.owner,
    "You have received a new request for your task",
  );
  return request;
};

export const getMyRequestsService = async (requesterId) => {
  return await findRequestsByRequester(requesterId);
};

export const getReceivedRequestsService = async (ownerId) => {
  const requests = await findReceivedRequests(ownerId);
  return requests.filter((request) => request.task !== null);
};

export const acceptRequestService = async (requestId, ownerId) => {
  const request = await findRequestById(requestId);
  if (!request) {
    throw new AppError("Request not found ", 404);
  }
  if (request.task.owner.toString() !== ownerId.toString()) {
    throw new AppError("Not authorized to accept this request", 403);
  }
  if (request.status !== "pending") {
    throw new AppError(`Request is already ${request.status}`, 400);
  }

  const updatedRequest = await updateRequestStatus(requestId, "accepted");

  const updatedTask = await updateTaskById(request.task._id, {
    status: "assigned",
    assignedHelper: request.requester,
  });

  console.log("UPDATED TASK:", updatedTask);

  await createNotificationService(
    request.requester,
    `Your request for "${request.task.title}" has been accepted`,
  );
  await rejectOtherRequestsForTask(request.task._id, requestId);
  return updatedRequest;
};

export const rejectRequestService = async (requestId, ownerId) => {
  const request = await findRequestById(requestId);

  if (!request) {
    throw new AppError("Request not found", 404);
  }

  if (request.task.owner.toString() != ownerId.toString()) {
    throw new AppError("Not authorized to reject this request", 403);
  }

  if (request.status !== "pending") {
    throw new AppError(`Request is already ${request.status}`, 400);
  }

  const updatedRequest = await updateRequestStatus(requestId, "rejected");

  await createNotificationService(
    request.requester,
    `Your request for ${request.task.title} has been rejected`,
  );
  return updatedRequest;
};
