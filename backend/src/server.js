import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import examRoutes from "./routes/examRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import studySessionRoutes from "./routes/studySessionRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// CORS configuration for Azure Container Apps
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://exam-planner-frontend.graywave-05c71fd1.southeastasia.azurecontainerapps.io'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/exams", examRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/sessions", studySessionRoutes);
app.use("/api/stats", statsRoutes);

// Basic route for checking server status
app.get("/", (req, res) => {
  res.send("Exam Study Planner API is running...");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
  });
});
