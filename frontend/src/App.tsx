import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashBoardLayout";
import DashBoard from "./pages/DashBoard";
import ExamsPage from "./pages/ExamsPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import TopicsPage from "./pages/TopicsPage";
import ActivityPage from "./pages/ActivityPage";
import ProgressPage from "./pages/ProgressPage";
import SchedulePage from "./pages/SchedulePage";
import TimeManagementPage from "./pages/TimeManagementPage";
import NotFound from "./pages/NotFound";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import { ModalProvider } from "./contexts/ModalContext";
import { AIProvider } from "./contexts/AIContext";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <BrowserRouter>
        <ModalProvider>
          <AIProvider>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashBoard />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="exams/:examId" element={<ExamDetailsPage />} />
                <Route path="topics" element={<TopicsPage />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="time" element={<TimeManagementPage />} />
              <Route path="study-planner" element={<StudyPlannerPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AIProvider>
        </ModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
