import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    studyStartDate: {
      type: Date,
    },
    endStudyDate: {
      type: Date,
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
