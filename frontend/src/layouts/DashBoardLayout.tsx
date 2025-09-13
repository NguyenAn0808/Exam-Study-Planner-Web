// src/layouts/DashboardLayout.tsx

import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar"; // Assuming you have Navbar.tsx
import { Sidebar } from "../components/navigation/SideBar"; // Assuming you have Sidebar.tsx
import { CreateExamModal } from "@/components/exams/CreateExamModal";
import { useExams } from "@/hooks/useExams";

export const DashboardLayout = () => {
  const [isCreateExamModalOpen, setCreateExamModalOpen] = useState(false);
  const { exams, isLoading } = useExams();

  // Calculate stats for the sidebar
  const sidebarStats = useMemo(() => {
    if (isLoading || !exams) {
      return {
        examCount: null,
        topicsCompleted: null,
        totalTopics: null,
        overallProgress: null,
      };
    }

    const totalTopics = exams.reduce((sum, exam) => sum + exam.totalTopics, 0);
    const topicsCompleted = exams.reduce(
      (sum, exam) => sum + exam.completedTopics,
      0
    );
    const overallProgress =
      totalTopics > 0 ? Math.round((topicsCompleted / totalTopics) * 100) : 0;

    return {
      examCount: exams.length,
      topicsCompleted,
      totalTopics,
      overallProgress,
    };
  }, [exams, isLoading]);

  const handleAddNewExamClick = () => {
    setCreateExamModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar onAddNewExamClick={handleAddNewExamClick} />
      <div className="flex">
        <Sidebar stats={sidebarStats} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <CreateExamModal
        isOpen={isCreateExamModalOpen}
        onOpenChange={setCreateExamModalOpen}
      />
    </div>
  );
};
