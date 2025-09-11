import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import StudyHoursRoute from "./routes/hours";
import TopicsRoute from "./routes/topics";
import DashBoard from "./pages/DashBoard";
import ExamsRoute from "@/routes/exams";
import ActivityRoute from "@/routes/activity";
import ProgressRoute from "@/routes/progress";
import ScheduleRoute from "@/routes/schedule";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="/exams" element={<ExamsRoute />} />
            <Route path="/hours" element={<StudyHoursRoute />} />
            <Route path="/topics" element={<TopicsRoute />} />
            <Route path="/activity" element={<ActivityRoute />} />
            <Route path="/progress" element={<ProgressRoute />} />
            <Route path="/schedule" element={<ScheduleRoute />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
