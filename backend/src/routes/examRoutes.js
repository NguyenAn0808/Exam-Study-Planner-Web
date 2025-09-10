import express from "express";
import {
  getExamById,
  updateExam,
  deleteExam,
  createNewExam,
  getAllExams,
} from "../controllers/examController.js";

const router = express.Router();

// We will add authMiddleware later.

router.route("/", createNewExam);
router.route("/", getAllExams);
router.route("/:id", getExamById);
router.route("/:id", updateExam);
router.route("/:id", deleteExam);

export default router;
