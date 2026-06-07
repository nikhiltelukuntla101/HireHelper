import AsyncHandler from "../utils/AsyncHandler.js";
import {
  createTaskService,
  getMyTasksService,
  getFeedTasksService,
  getTasksByIdService,
  updateTaskService,
  deleteTaskService,
  markTaskCompleteService,
  confirmTaskCompletionService,
} from "../services/task.service.js";

export const createTask = AsyncHandler(async (req, res) => {
  try {
    const task = await createTaskService(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
      task,
    });
  } catch (err) {
    throw err;
  }
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

export const getTaskById = AsyncHandler(async (req, res) => {
  const task = await getTasksByIdService(req.params.id);
  res.status(200).json({
    success: true,
    task,
  });
});

export const updateTask = AsyncHandler(async (req, res) => {
  const task = await updateTaskService(req.params.id, req.user._id, req.body);
  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
});

export const deleteTask = AsyncHandler(async (req, res) => {
  await deleteTaskService(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

export const markTaskCompete = async (req, res, next) => {
  try {
    const task = await markTaskCompleteService(req.params.taskId, req.user._id);
    res.status(200).json({
      success: true,
      message: "Task marked as completed",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmTaskCompletion = async (req, res, next) => {
  try {
    const task = await confirmTaskCompletionService(
      req.params.taskId,
      req.user._id,
    );

    res.status(200).json({
      success: true,
      message: `Task ${task.title} confirmed as completed`,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
