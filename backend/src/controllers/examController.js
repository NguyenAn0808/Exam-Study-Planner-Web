import ActivityLog from "../models/ActivityLog.js";
import Exam from "../models/Exam.js";
import Topic from "../models/Topic.js";
import mongoose from "mongoose";

export const createNewExam = async (req, res) => {
  try {
    const { title, examDate, studyStartDate, endStudyDate } = req.body;
    if (!title || !examDate) {
      return res
        .status(400)
        .json({ message: "Title and exam date are required" });
    }
    const exam = new Exam({
      title,
      examDate,
      studyStartDate,
      endStudyDate,
      isAIGenerated: false,
    });

    const newExam = await exam.save();

    await new ActivityLog({
      action: "CREATED_EXAM",
      details: newExam.title,
    }).save();

    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const examsWithStats = await Exam.aggregate([
      {
        $lookup: {
          from: "topics",
          localField: "_id",
          foreignField: "exam",
          as: "topics",
        },
      },
      {
        $addFields: {
          totalTopics: { $size: "$topics" },
          completedTopics: {
            $size: {
              $filter: {
                input: "$topics",
                as: "topic",
                cond: { $eq: ["$$topic.status", "Completed"] },
              },
            },
          },
          inProgressTopics: {
            $size: {
              $filter: {
                input: "$topics",
                as: "topic",
                cond: { $eq: ["$$topic.status", "In-progress"] },
              },
            },
          },
        },
      },
      {
        $addFields: {
          progress: {
            $cond: [
              { $eq: ["$totalTopics", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$completedTopics", "$totalTopics"] },
                  100,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { examDate: 1 },
      },
      // {
      //   $project: {
      //     topics: 0,
      //   },
      // },
    ]);

    res.status(200).json(examsWithStats);
  } catch (error) {
    console.error("Error getting all exams with aggregation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ message: "Invalid Exam ID" });
    }

    const aggregationResult = await Exam.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(examId),
        },
      },
      {
        $lookup: {
          from: "topics",
          localField: "_id",
          foreignField: "exam",
          as: "topics",
        },
      },
      {
        $addFields: {
          counts: {
            "Not Started": {
              $size: {
                $filter: {
                  input: "$topics",
                  cond: { $eq: ["$$this.status", "Not Started"] },
                },
              },
            },
            "In-progress": {
              $size: {
                $filter: {
                  input: "$topics",
                  cond: { $eq: ["$$this.status", "In-progress"] },
                },
              },
            },
            Completed: {
              $size: {
                $filter: {
                  input: "$topics",
                  cond: { $eq: ["$$this.status", "Completed"] },
                },
              },
            },
          },
        },
      },
    ]);

    const examData = aggregationResult[0];

    if (!examData) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json(examData);
  } catch (error) {
    console.error("Error getting exam by id with aggregation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { title, examDate, studyStartDate, endStudyDate } = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { title, examDate, studyStartDate, endStudyDate },
      { new: true, runValidators: true }
    );

    if (!updatedExam) {
      res.status(404).json({ message: "Exam not found" });
    } else {
      res.status(200).json(updatedExam);
    }
  } catch (error) {
    console.error("Error update exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Also delete all topics associated with this exam
    await Topic.deleteMany({ exam: req.params.id });
    await exam.deleteOne();

    await new ActivityLog({
      action: "DELETED_EXAM",
      details: exam.title,
      examId: exam._id,
    }).save();

    res.status(200).json({ message: "Exam and associated topics deleted" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
