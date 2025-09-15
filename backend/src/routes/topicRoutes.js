import express from "express";
import {
  updateTopic,
  deleteTopic,
  createNewTopic,
  getAllTopicsByExam,
  getAllTopics,
} from "../controllers/topicController.js";

const router = express.Router();

// We will add authMiddleware later.

router.route("/").post(createNewTopic).get(getAllTopics); // Add get all topics to root route
router.route("/exam/:examID").get(getAllTopicsByExam);
router.route("/:id").put(updateTopic).delete(deleteTopic);
export default router;
