// src/App.tsx

import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashBoardLayout"; // Giả sử DashboardLayout ở layouts

// Import tất cả các component trang từ thư mục "pages"
import DashBoard from "./pages/DashBoard";
import ExamsPage from "./pages/ExamsPage";
import ExamDetailsPage from "./pages/ExamDetailsPage";
import StudyHoursPage from "./pages/StudyHoursPage";
import TopicsPage from "./pages/TopicsPage";
import ActivityPage from "./pages/ActivityPage";
import ProgressPage from "./pages/ProgressPage";
import SchedulePage from "./pages/SchedulePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <BrowserRouter>
        <Routes>
          {/* Layout chung cho tất cả các trang có sidebar và navbar */}
          <Route path="/" element={<DashboardLayout />}>
            {/* Trang Dashboard sẽ được hiển thị mặc định tại "/" */}
            <Route index element={<DashBoard />} />

            {/* Các trang con */}
            <Route path="exams" element={<ExamsPage />} />
            <Route path="exams/:examId" element={<ExamDetailsPage />} />
            <Route path="hours" element={<StudyHoursPage />} />
            <Route path="topics" element={<TopicsPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="schedule" element={<SchedulePage />} />
          </Route>

          {/* Route cho trang 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
