import StudySession from "../models/StudySession.js";
import mongoose from "mongoose";

export const getDashboardStats = async (req, res) => {
  try {
    const result = await StudySession.aggregate([
      {
        $group: {
          _id: null,
          totalMinutes: { $sum: "$durationMinutes" },
        },
      },
    ]);

    const totalMinutes = result.length > 0 ? result[0].totalMinutes : 0;

    res.status(200).json({ totalStudyMinutes: totalMinutes });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTopicActualTime = async (req, res) => {
  try {
    const { topicId } = req.params;

    // Validate the topicId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid Topic ID format." });
    }

    const result = await StudySession.aggregate([
      {
        $match: {
          topicId: new mongoose.Types.ObjectId(topicId),
        },
      },
      {
        $group: {
          _id: "$topicId",
          actualMinutes: { $sum: "$durationMinutes" },
        },
      },
    ]);

    const actualMinutes = result.length > 0 ? result[0].actualMinutes : 0;

    res.status(200).json({ topicId, actualMinutes });
  } catch (error) {
    console.error(
      `Error getting actual time for topic ${req.params.topicId}:`,
      error
    );
    res.status(500).json({ message: "Server Error" });
  }
};
