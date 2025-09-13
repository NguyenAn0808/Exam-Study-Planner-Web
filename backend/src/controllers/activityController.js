import ActivityLog from "../models/ActivityLog.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find({})
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error getting activities:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
