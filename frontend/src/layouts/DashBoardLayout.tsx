import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Sidebar } from "../components/navigation/SideBar";
import { CreateExamModal } from "@/components/exams/CreateExamModal";
import { useExams } from "@/hooks/useExams";
import { useModal } from "@/contexts/ModalContext";
import { useAI } from "@/contexts/AIContext";
import { QuestionModal } from "@/components/ai/QuestionModal";
import { useGenerateQuestions } from "@/hooks/useGenerateQuestions";

export const DashboardLayout = () => {
  const { isCreateExamModalOpen, closeCreateExamModal } = useModal();

  const { exams, isLoading } = useExams();

  const {
    isQuestionModalOpen,
    closeQuestionModal,
    activeTopicName,
    questions,
    setQuestions,
  } = useAI();

  const { mutate: generateQuestions, isPending: isGeneratingQuestions } =
    useGenerateQuestions();

  const handleGenerate = () => {
    if (activeTopicName) {
      generateQuestions(activeTopicName, {
        onSuccess: (data) => {
          setQuestions(data.questions); // Set the questions in context on success
        },
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
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
        onOpenChange={closeCreateExamModal}
      />
      {/* 6. Add the QuestionModal */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onOpenChange={closeQuestionModal}
        topicName={activeTopicName}
        questions={questions}
        isLoading={isGeneratingQuestions}
        onGenerate={handleGenerate}
      />
    </div>
  );
};
