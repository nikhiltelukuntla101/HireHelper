import Task from "../models/Task.js";

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const findTaskByOwner = async (ownerId) => {
  return await Task.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
};

export const findTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

export const findFeedTasks = async (userId) => {
  return await Task.find({
    owner: {
      $ne: userId,
    },
    status: "open",
  })
    .populate("owner", "firstName lastName profilePicture")
    .sort({
      createdAt: -1,
    });
};
