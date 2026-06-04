import AsyncHandler from "../utils/AsyncHandler.js";
import {
  createTaskService,
  getMyTasksService,
  getFeedTasksService,
} from "../services/task.service.js";

export const createTask = AsyncHandler(async (req, res) => {
  const task = await createTaskService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Task created Successfully",
    task,
  });
});

export const getMyTasks = AsyncHandler(async (req, res) => {
  const tasks = await getMyTasksService(req.user._id);

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

export const getFeedTasks = AsyncHandler(async (req, res) => {
  const tasks = await getFeedTasksService(req.user._id);

  res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});
