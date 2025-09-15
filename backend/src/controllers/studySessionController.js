import StudySession from "../models/StudySession.js";
import Exam from "../models/Exam.js";
import Topic from "../models/Topic.js";
import mongoose from "mongoose";

export const logStudySession = async (req, res) => {
  try {
    const { durationMinutes, examId, topicId } = req.body;

    if (!durationMinutes || !examId || !topicId) {
      return res.status(400).json({
        message: "Duration, Exam ID, and Topic ID are required.",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(examId) ||
      !mongoose.Types.ObjectId.isValid(topicId)
    ) {
      return res.status(400).json({ message: "Invalid ID format." });
    }
    const examExists = await Exam.findById(examId);
    const topicExists = await Topic.findById(topicId);
    if (!examExists || !topicExists) {
      return res
        .status(404)
        .json({ message: "Associated exam or topic not found." });
    }

    const newSession = new StudySession({
      durationMinutes,
      examId,
      topicId,
    });

    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
  } catch (error) {
    console.error("Error logging study session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getStudySessions = async (req, res) => {
  try {
    const sessions = await StudySession.find({}).sort({ date: -1 }).limit(50);

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error getting study sessions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
