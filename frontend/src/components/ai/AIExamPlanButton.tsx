import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAI } from "@/contexts/AIContext";
import { useNavigate } from "react-router-dom";
import type { IExamWithStats } from "@/types";
import type { StudentPreferences } from "@/types/ai-agent/preferences";

interface AIExamPlanButtonProps {
  exam: IExamWithStats;
  variant?: "default" | "large" | "primary";
  onSuccess?: () => void;
}

export const AIExamPlanButton: React.FC<AIExamPlanButtonProps> = ({
  exam,
  variant = "default",
  onSuccess,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateStudyPlan } = useAI();
  const navigate = useNavigate();

  // For debugging - log the exam object
  // console.log("Exam in AIExamPlanButton:", exam.title, "isAIGenerated:", exam.isAIGenerated);

  // Only show the button for AI-generated exams that don't have topics yet
  const titleHasAI = exam.title.toLowerCase().includes("ai");
  const isAIExam = exam.isAIGenerated === true || titleHasAI;
  const hasTopics = exam.totalTopics > 0;

  // Hide button if:
  // 1. Not an AI-generated exam, OR
  // 2. Already has topics (plan has been generated)
  if (!isAIExam || hasTopics) return null;

  const handleGeneratePlan = async () => {
    try {
      setIsGenerating(true);
      const preferences: StudentPreferences = {
        studyHabits: {
          preferredStudyTime: "morning",
          sessionDuration: 45,
          breakDuration: 15,
          energyLevels: {
            morning: "high",
            afternoon: "medium",
            evening: "medium",
          },
          usePomodoroTechnique: true,
          pomodoroSettings: {
            workMinutes: 25,
            shortBreakMinutes: 5,
            longBreakMinutes: 15,
            cyclesBeforeLongBreak: 4,
          },
        },
        examPreferences: {
          difficultyLevel: "intermediate",
          targetGrade: "A",
          currentKnowledgeLevel: "intermediate",
          timeAvailablePerDay: 2,
          stressLevel: "medium",
          confidenceLevel: "medium",
        },
        adaptiveSettings: {
          receiveReminders: true,
          adjustForProcrastination: true,
          difficultyAdjustment: "automatic",
          stressManagement: true,
        },
      };

      await generateStudyPlan(preferences, new Date(exam.examDate), exam.title);

      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to the exam details page if not already there
        navigate(`/exams/${exam._id}`);
      }
    } catch (error) {
      console.error("Error generating study plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Button styling based on variant
  let buttonStyles = "";
  let buttonVariant: "default" | "outline" = "outline";
  let buttonSize: "default" | "sm" | "lg" = "sm";

  if (variant === "large") {
    buttonStyles = "w-full";
    buttonSize = "lg";
    buttonVariant = "default";
  } else if (variant === "primary") {
    buttonStyles =
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white";
    buttonVariant = "default";
  }

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={buttonStyles}
      onClick={handleGeneratePlan}
      disabled={isGenerating}
    >
      <Sparkles className="mr-2 h-4 w-4" />
      {isGenerating ? "Generating Plan..." : "Generate AI Study Plan"}
    </Button>
  );
};
