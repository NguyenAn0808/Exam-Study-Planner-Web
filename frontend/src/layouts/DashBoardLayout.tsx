// src/layouts/DashboardLayout.tsx

import { useState, useMemo } from "react"; // 1. Add useMemo
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Sidebar } from "../components/navigation/Sidebar";
import { CreateExamModal } from "@/components/exams/CreateExamModal";
import { useExams } from "@/hooks/useExams"; // 2. Import useExams

export const DashboardLayout = () => {
  const [isCreateExamModalOpen, setCreateExamModalOpen] = useState(false);
  const { exams, isLoading } = useExams(); // 3. Fetch global exam data here

  // 4. Calculate stats for the sidebar
  const sidebarStats = useMemo(() => {
    if (isLoading || !exams) {
      // Return loading/default state
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
    <div className="min-h-screen bg-background">
      <Navbar onAddNewExamClick={handleAddNewExamClick} />
      <div className="flex">
        {/* 5. Pass the calculated stats down to the Sidebar */}
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
