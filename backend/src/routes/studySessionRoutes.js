import express from "express";
import { logStudySession } from "../controllers/studySessionController.js";
import { getStudySessions } from "../controllers/studySessionController.js";
const router = express.Router();
router.route("/").post(logStudySession).get(getStudySessions);
export default router;
