import Task from "../models/Task.js";

// CRUD
export const addNewTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Failed to create new task: ", error);
    res.status(500).json({ message: "System failed" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Failed to get all tasks: ", error);
    res.status(500).json({ message: "System failed" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );

    if (!updateTask) {
      res.status(404).json({ message: "Task is not available to update" });
    } else {
      res.status(200).json(updateTask);
    }
  } catch (error) {
    console.error("Failed to update task: ", error);
    res.status(500).json({ message: "System failed" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (deleteTask) {
      res.status(404).json({ message: "Task is not available to delete" });
    } else {
      res.status(200).json(deleteTask);
    }
  } catch (error) {
    console.error("Failed to delete task: ", error);
    res.status(500).json({ message: "System failed" });
  }
};
