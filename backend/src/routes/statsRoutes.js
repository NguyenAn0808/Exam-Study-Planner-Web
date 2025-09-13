import express from "express";
import {
  getDashboardStats,
  getTopicActualTime,
} from "../controllers/statsController.js";

const router = express.Router();

router.route("/dashboard").get(getDashboardStats);

router.route("/topic-time/:topicId").get(getTopicActualTime);

export default router;
