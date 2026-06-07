import api from "../api/axios";

export const getFeedTasks = async () => {
  const response = await api.get("/tasks/feed");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);

  return response.data;
};

export const requestTask = async (taskId) => {
  const response = await api.post(`/requests/${taskId}`);
  return response.data;
};

export const getMyTasks = async () => {
  const response = await api.get("/tasks/my-tasks");
  return response.data;
};
