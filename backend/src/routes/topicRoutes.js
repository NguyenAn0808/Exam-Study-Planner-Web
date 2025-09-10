import express from "express";
import {
  updateTopic,
  deleteTopic,
  createNewTopic,
  getAllTopicsByExam,
} from "../controllers/topicController.js";

const router = express.Router();

// We will add authMiddleware later.

router.route("/").post(createNewTopic);
router.route("/exam/:examID").get(getAllTopicsByExam);
router.route("/:id").put(updateTopic).delete(deleteTopic);

export default router;
