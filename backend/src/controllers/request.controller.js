import asyncHandler from "../utils/AsyncHandler.js";

import {
  createRequestService,
  getMyRequestsService,
  getReceivedRequestsService,
  acceptRequestService,
  rejectRequestService,
} from "../services/request.service.js";

export const requestTask = asyncHandler(async (req, res) => {
  const request = await createRequestService(req.params.taskId, req.user.id);

  res.status(201).json({
    success: true,
    message: "Request sent successfully",
    request,
  });
});

export const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await getMyRequestsService(req.user._id);

  res.status(200).json({
    success: true,
    count: requests.length,
    requests,
  });
});

export const getReceivedRequests = asyncHandler(async (req, res) => {
  const requests = await getReceivedRequestsService(req.user._id);

  res.status(200).json({
    success: true,
    count: requests.length,

    requests,
  });
});

export const acceptRequest = asyncHandler(async (req, res) => {
  await acceptRequestService(req.params.requestId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Request accepted successfully",
  });
});

export const rejectRequest = asyncHandler(async (req, res) => {
  await rejectRequestService(req.params.requestId, req.user._id);
  res.status(200).json({
    success: true,
    message: "Request rejected successfully",
  });
});
