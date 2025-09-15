import express from "express";
import {
  generateQuestions,
  generateExamPlan,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-questions", generateQuestions);
router.post("/generate-exam-plan", generateExamPlan);
export default router;
