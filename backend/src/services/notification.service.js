import AppError from "../utils/AppError.js";

import {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
} from "../repositories/notification.repository.js";

export const createNotificationService = async (userId, message) => {
  return await createNotification({ user: userId, message });
};

export const getNotificationsService = async (userId) => {
  return await getNotificationsByUser(userId);
};

export const markNotificationAsReadService = async (notificationId) => {
  const notification = await markNotificationAsRead(notificationId);
  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return notification;
};
