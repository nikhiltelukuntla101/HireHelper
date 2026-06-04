import {
  createTask,
  findTaskByOwner,
  findFeedTasks,
  findTaskById,
  updateTaskById,
  deleteTaskById,
} from "../repositories/task.repository.js";
import AppError from "../utils/AppError.js";

export const createTaskService = async (taskData, ownerId) => {
  return await createTask({
    ...taskData,
    owner: ownerId,
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
