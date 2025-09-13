// backend/src/models/ActivityLog.js

import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "CREATED_EXAM",
        "DELETED_EXAM",
        "CREATED_TOPIC",
        "DELETED_TOPIC",
        "COMPLETED_TOPIC",
        "UNCOMPLETED_TOPIC",
      ],
    },
    details: {
      type: String,
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
