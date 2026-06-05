import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    picture: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "open",
        "assigned",
        "pending_confirmation",
        "completed",
        "cancelled",
      ],
      default: "open",
    },
    assignedHelper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Task", taskSchema);
