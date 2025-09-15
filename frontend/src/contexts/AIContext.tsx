import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AIQuestion } from "@/hooks/useGenerateQuestions";
import type { StudyPlan } from "@/types/ai-agent/study-plan";
import type { StudentPreferences } from "@/types/ai-agent/preferences";
import AIStudyAgent from "@/services/AIStudyAgent";

  interface AIContextType {
  isQuestionModalOpen: boolean;
  openQuestionModal: (topicName: string) => void;
  closeQuestionModal: () => void;
  activeTopicName: string | null;
  questions: AIQuestion[] | null;
  setQuestions: (questions: AIQuestion[] | null) => void;
  // Study Planner features
  studyPlan: StudyPlan | null;
  loading: boolean;
  error: string | null;
  generateStudyPlan: (preferences: StudentPreferences, examDate: Date, subject: string, description?: string) => Promise<void>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);
  const [activeTopicName, setActiveTopicName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<AIQuestion[] | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  const openQuestionModal = (topicName: string) => {
    setActiveTopicName(topicName);
    setQuestions(null); // Reset previous questions
    setQuestionModalOpen(true);
  };

  const closeQuestionModal = () => {
    setQuestionModalOpen(false);
    setActiveTopicName(null);
    setQuestions(null);
  };

  const generateStudyPlan = async (
    preferences: StudentPreferences,
    examDate: Date,
    subject: string,
    description?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a new agent instance and generate study plan
      const studyAgent = new AIStudyAgent(preferences, examDate, subject, description);
      const plan = await studyAgent.generateAndCreateStudyPlan();
      setStudyPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the study plan');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isQuestionModalOpen,
    openQuestionModal,
    closeQuestionModal,
    activeTopicName,
    questions,
    setQuestions,
    studyPlan,
    loading,
    error,
    generateStudyPlan,
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
