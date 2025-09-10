import express from "express";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasksControllers.js";

const router = express.Router();

router.post("/", addNewTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
