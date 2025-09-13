import Topic from "../models/Topic.js";
import Exam from "../models/Exam.js";
import ActivityLog from "../models/ActivityLog.js";

export const createNewTopic = async (req, res) => {
  try {
    const { name, examID } = req.body;
    const exam = await Exam.findById(examID);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    } else {
      // Add authorization check for the exam later
      const topic = new Topic({ name, exam: examID });
      const newTopic = await topic.save();

      await new ActivityLog({
        action: "CREATED_TOPIC",
        details: newTopic.name,
        examId: newTopic.exam,
      }).save();

      res.status(201).json(newTopic);
    }
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllTopicsByExam = async (req, res) => {
  try {
    const { examID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examID)) {
      return res.status(400).json({ message: "Invalid Exam ID" });
    }

    const aggregationResult = await Topic.aggregate([
      {
        $match: {
          exam: new mongoose.Types.ObjectId(examID),
        },
      },
      {
        $facet: {
          topics: [{ $sort: { createdAt: "asc" } }],
          statusCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const result = aggregationResult[0];
    const topics = result.topics;
    const counts = {
      "Not Started": 0,
      "In-progress": 0,
      Completed: 0,
    };

    result.statusCounts.forEach((item) => {
      counts[item._id] = item.count;
    });

    res.status(200).json({
      topics,
      counts,
    });
  } catch (error) {
    console.error("Error getting topics by exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { name, status, completedAt } = req.body;
    const topicID = req.params.id;

    const originalTopic = await Topic.findById(topicID);
    if (!originalTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const oldStatus = originalTopic.status;

    const updatedTopic = await Topic.findByIdAndUpdate(
      topicID,
      { name, status, completedAt },
      { new: true, runValidators: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    if (status && status !== oldStatus) {
      if (status === "Completed") {
        await new ActivityLog({
          action: "COMPLETED_TOPIC",
          details: updatedTopic.name,
          examId: updatedTopic.exam,
        }).save();
      } else if (oldStatus === "Completed") {
        await new ActivityLog({
          action: "UNCOMPLETED_TOPIC",
          details: updatedTopic.name,
          examId: updatedTopic.exam,
        }).save();
      }
    }

    res.status(200).json(updatedTopic);
  } catch (error) {
    console.error("Error update topic:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.params.id);

    if (!deletedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await new ActivityLog({
      action: "DELETED_TOPIC",
      details: deletedTopic.name,
      examId: deletedTopic.exam,
    }).save();
    res.status(200).json({ message: "Topic deleted" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({})
      .sort({ createdAt: -1 })
      .populate("exam", "title");

    res.status(200).json(topics);
  } catch (error) {
    console.error("Error get all topics:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
