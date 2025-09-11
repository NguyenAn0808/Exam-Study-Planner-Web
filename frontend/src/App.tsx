import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import DashBoard from "@/pages/DashBoard";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="/exams" element={<div>Exams Page</div>} />
            <Route path="/planner" element={<div>Planner Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
