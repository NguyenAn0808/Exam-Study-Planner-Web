import express from "express";
import {
  updateTopic,
  deleteTopic,
  createNewTopic,
  getAllTopicsByExam,
} from "../controllers/topicController.js";

const router = express.Router();

// We will add authMiddleware later.

router.route("/", createNewTopic);
router.route("/", getAllTopicsByExam);
router.route("/:id", updateTopic);
router.route("/:id", deleteTopic);

export default router;
