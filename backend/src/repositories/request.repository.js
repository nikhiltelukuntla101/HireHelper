import Request from "../models/Request.js";

export const createRequest = async (data) => {
  return await Request.create(data);
};

export const findRequestByTaskAndRequester = async (taskId, requesterId) => {
  return await Request.findOne({
    task: taskId,
    requester: requesterId,
  });
};

export const findRequestsByRequester = async (requesterId) => {
  return await Request.find({ requester: requesterId })
    .populate("task")
    .sort({ createdAt: -1 });
};

export const findReceivedRequests = async (ownerId) => {
  return await Request.find()
    .populate({
      path: "task",
      match: {
        owner: ownerId,
      },
    })
    .populate("requester", "firstName lastName email phone");
};

export const findRequestById = async (requestId) => {
  return await Request.findById(requestId).populate("task");
};

export const updateRequestStatus = async (requestId, status) => {
  return await Request.findByIdAndUpdate(requestId, { status }, { new: true });
};
