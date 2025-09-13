import express from "express";
import { logStudySession } from "../controllers/studySessionController.js";

const router = express.Router();
router.route("/").post(logStudySession);
export default router;
