import {
  createTask,
  findTaskByOwner,
  findFeedTasks,
} from "../repositories/task.repository.js";

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
