import AppError from "../utils/AppError.js";
import {
  findTaskById,
  updateTaskStatus,
} from "../repositories/task.repository.js";

import {
  createRequest,
  findRequestByTaskAndRequester,
  findRequestsByRequester,
  findReceivedRequests,
  findRequestById,
  updateRequestStatus,
} from "../repositories/request.repository.js";

export const createRequestService = async (taskId, requesterId) => {
  console.log("TASK ID:", taskId);

  const task = await findTaskById(taskId);

  console.log("TASK FOUND:", task);
  taskId;
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
  return await createRequest({
    task: taskId,
    requester: requesterId,
  });
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

  await updateTaskStatus(request.task._id, "assigned");
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

  return await updateRequestStatus(requestId, "rejected");
};
