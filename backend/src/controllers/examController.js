import Exam from "../models/Exam.js";
import Topic from "../models/Topic.js";

export const createNewExam = async (req, res) => {
  try {
    const { title, examDate, studyStartDate, endStudyDate } = req.body;
    if (!title || !examDate) {
      return res
        .status(400)
        .json({ message: "Title and exam date are required" });
    }
    const exam = new Exam({ title, examDate, studyStartDate, endStudyDate });

    const newExam = await exam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ examDate: 1 });
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
      res.status(200).json(exam);
    }
  } catch (error) {
    console.error("Error get exam by id:", error);
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

    res.status(200).json({ message: "Exam and associated topics deleted" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
