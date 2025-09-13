import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import examRoutes from "./routes/examRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] })); // Enable CORS for front end

// API Routes
app.use("/api/exams", examRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/ai", aiRoutes);

// Basic route for checking server status
app.get("/", (req, res) => {
  res.send("Exam Study Planner API is running...");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
  });
});
