import Notification from "../models/Notification.js";

export const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

export const getNotificationsByUser = async (userId) => {
  return await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
};

export const markNotificationAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    {
      isRead: true,
    },
    { new: true },
  );
};
