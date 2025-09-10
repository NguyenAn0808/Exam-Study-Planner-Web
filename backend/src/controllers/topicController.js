import Topic from "../models/Topic.js";
import Exam from "../models/Exam.js";

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
    // Add authentication later

    const topics = await Topic.find({ exma: examID }).sort({
      createdAt: "asc",
    });
    res.json(topics);
  } catch (error) {
    console.error("Error get topic by exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { name, status, completedAt } = req.body;
    const updateTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { name, status, completedAt },
      { new: true }
    );

    if (!updateTopic) {
      res.status(404).json({ message: "Topic not found" });
    } else {
      res.status(200).json(updateTopic);
    }
  } catch (error) {
    console.error("Error update topic:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const deleteTopic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      res.status(404).json({ message: "Topic not found" });
    } else {
      res.status(200).json(deleteTopic);
    }
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
