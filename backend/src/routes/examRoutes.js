import express from "express";
import {
  getExamById,
  updateExam,
  deleteExam,
  createNewExam,
  getAllExams,
} from "../controllers/examController.js";

const router = express.Router();

router.route("/").post(createNewExam).get(getAllExams);

router.route("/:id").get(getExamById).put(updateExam).delete(deleteExam);

export default router;
