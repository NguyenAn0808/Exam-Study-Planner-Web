import express from "express";
import { generateQuestions } from "../controllers/aiController.js";

const router = express.Router();

router.route("/generate-questions").post(generateQuestions);

export default router;
