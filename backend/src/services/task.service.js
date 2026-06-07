import { createNotificationService } from "./notification.service.js";
import {
  createTask,
  findTaskByOwner,
  findFeedTasks,
  findTaskById,
  updateTaskById,
  deleteTaskById,
} from "../repositories/task.repository.js";
import AppError from "../utils/AppError.js";

export const createTaskService = async (taskData, user) => {
  console.log("TASK DATA:", taskData);
  console.log("USER:", user);

  if (user.role !== "owner" && user.role !== "both") {
    throw new AppError("Only owners can create tasks", 403);
  }

  return await createTask({
    ...taskData,
    owner: user._id,
  });
};

export const getMyTasksService = async (ownerId) => {
  return await findTaskByOwner(ownerId);
};

export const getFeedTasksService = async (userId) => {
  return await findFeedTasks(userId);
};

export const getTasksByIdService = async (taskId) => {
  const task = await findTaskById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const updateTaskService = async (taskId, userId, updateData) => {
  const task = await findTaskById(taskId);
  if (!task) {
    throw new AppError("Task not Found", 404);
  }

  if (task.owner.toString() !== userId.toString()) {
    throw new AppError("Not authorized to update task", 403);
  }
  return await updateTaskById(taskId, updateData);
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.owner.toString() !== userId.toString()) {
    throw new AppError("Not authorized to delete this task", 403);
  }

  await deleteTaskById(taskId);
};

export const markTaskCompleteService = async (taskId, helperId) => {
  const task = await findTaskById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  if (!task.assignedHelper) {
    throw new AppError("Task has no assigned helper", 400);
  }
  if (task.assignedHelper.toString() !== helperId.toString()) {
    throw new AppError("Only assigned helper can mark task complete", 403);
  }
  if (task.status !== "assigned") {
    throw new AppError("Task is not in assigned state", 400);
  }

  const updatedTask = await updateTaskById(taskId, {
    status: "pending_confirmation",
  });

  await createNotificationService(
    task.owner,
    `Task "${task.title}" has been marked complete and is awaiting confirmation`,
  );
  return updatedTask;
};

export const confirmTaskCompletionService = async (taskId, ownerId) => {
  const task = await findTaskById(taskId);
  console.log("Task ID:", taskId);
  console.log("Task Status:", task.status);

  if (!task) {
    throw new AppError("Task not found", 404);
  }
  if (task.owner.toString() !== ownerId.toString()) {
    throw new AppError("Only owner can confirm completion", 403);
  }
  if (task.status !== "pending_confirmation") {
    throw new AppError("Task is not awaiting confirmation", 400);
  }
  const updatedTask = await updateTaskById(taskId, {
    status: "completed",
  });
  await createNotificationService(
    task.assignedHelper,
    `Task "${task.title}" has been confirmed as completed`,
  );

  return updatedTask;
};
