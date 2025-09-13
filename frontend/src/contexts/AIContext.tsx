import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AIQuestion } from "@/hooks/useGenerateQuestions";

interface AIContextType {
  isQuestionModalOpen: boolean;
  openQuestionModal: (topicName: string) => void;
  closeQuestionModal: () => void;
  activeTopicName: string | null;
  questions: AIQuestion[] | null;
  setQuestions: (questions: AIQuestion[] | null) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);
  const [activeTopicName, setActiveTopicName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AIQuestion[] | null>(null);

  const openQuestionModal = (topicName: string) => {
    setActiveTopicName(topicName);
    setQuestions(null); // Reset previous questions
    setQuestionModalOpen(true);
  };

  const closeQuestionModal = () => {
    setQuestionModalOpen(false);
    setActiveTopicName(null);
    setQuestions(null);
  };

  const value = {
    isQuestionModalOpen,
    openQuestionModal,
    closeQuestionModal,
    activeTopicName,
    questions,
    setQuestions,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
