import api from "../api/axios";

export const getMyRequests = async () => {
  const response = await api.get("/requests/my-requests");
  return response.data;
};

export const getReceivedRequests = async () => {
  const response = await api.get("/requests/received");
  return response.data;
};

export const acceptRequest = async (requestId) => {
  const response = await api.patch(`/requests/${requestId}/accept`);
  return response.data;
};

export const rejectRequest = async (requestId) => {
  const response = await api.patch(`/requests/${requestId}/reject`);
  return response.data;
};
