import { deleteTask } from "../../../../full-stack-todo-app/backend/src/controllers/taskControllers.js";
import Exam from "../models/Exam.js";
import Topic from "../models/Topic.js";

export const createNewExam = async (req, res) => {
  try {
    const { title, examDate } = req.body;
    const exam = new Exam({ title, examDate });

    const newExam = await exam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllExams = async (req, res) => {
  try {
    // const exams = await Exam.find({ user: req.user.id }).sort({ date: 1 });
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error get all exams:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      res.status(404).json({ message: "Exam not found" });
    } else {
      // Add authorization check later: if (exam.user.toString() !== req.user.id) ...
      res.status(200).json(exam);
    }
  } catch (error) {
    console.error("Error get exam by id:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: True }
    );

    if (!updateExam) {
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
    const deleteExam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      res.status(404).json({ message: "Exam not found" });
    } else {
      res.status(200).json(deleteExam);
    }
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
