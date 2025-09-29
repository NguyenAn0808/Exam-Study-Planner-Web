import express from "express";
import {
  generateQuestions,
  generateExamPlan,
  generateTopics,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/generate-exam-plan", generateExamPlan);
router.post("/generate-topics", generateTopics);
export default router;
