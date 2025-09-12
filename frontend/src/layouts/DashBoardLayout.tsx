import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Sidebar } from "../components/navigation/SideBar";
import { useState } from "react";
import { CreateExamModal } from "@/components/exams/CreateExamModal";

export const DashboardLayout = () => {
  const [isCreateExamModalOpen, setCreateExamModalOpen] = useState(false);

  const handleAddNewExamClick = () => {
    setCreateExamModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAddNewExamClick={handleAddNewExamClick} />
      <div className="flex">
        <Sidebar />
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
