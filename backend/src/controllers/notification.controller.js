import AsyncHandler from "../utils/AsyncHandler.js";

import {
  getNotificationsService,
  markNotificationAsReadService,
} from "../services/notification.service.js";

export const getNotifications = AsyncHandler(async (req, res) => {
  const notifications = await getNotificationsService(req.user_.id);
  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications,
  });
});

export const markNotificationAsRead = AsyncHandler(async (req, res) => {
  const notification = await markNotificationAsReadService(
    req.params.notificationId,
  );

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    notification,
  });
});
