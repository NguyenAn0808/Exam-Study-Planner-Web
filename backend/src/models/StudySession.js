import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    durationMinutes: { type: Number, required: true, min: 1 },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

const StudySession = mongoose.model("StudySession", studySessionSchema);
export default StudySession;
