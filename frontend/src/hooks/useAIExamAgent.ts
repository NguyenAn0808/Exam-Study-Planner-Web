import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import type { ExamAIRequest, AIExamPlan } from "@/types/aiExamAgent";

const generateExamPlan = async (
  request: ExamAIRequest
): Promise<AIExamPlan> => {
  try {
    const { data } = await api.post("/ai/generate-exam-plan", request);
    return data;
  } catch (error: any) {
    console.error("AI Plan Generation Error:", error);

    // If we get a specific error message from the server, include it
    const errorMessage = error.response?.data?.message || "Network error";

    // Re-throw with more context for better debugging
    throw new Error(`Failed to generate exam plan: ${errorMessage}`);
  }
};

export const useAIExamAgent = () => {
  const [aiPlan, setAiPlan] = useState<AIExamPlan | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: generateExamPlan,
    onSuccess: (data) => {
      setAiPlan(data);
      setAnalysisProgress(100);
      setHasError(false);
      setErrorDetails(null);
      toast.success("AI exam plan generated successfully!");
    },
    onError: (error: any) => {
      console.error("Exam plan generation failed:", error);
      setAnalysisProgress(0);
      setHasError(true);
      setErrorDetails(error.message);
      toast.error("Failed to generate exam plan. Please try again later.");
    },
  });

  const simulateProgress = () => {
    setAnalysisProgress(0);
    setHasError(false);
    setErrorDetails(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  const generatePlan = (request: ExamAIRequest) => {
    const cleanup = simulateProgress();

    mutate(request, {
      onSettled: () => {
        cleanup();
      },
    });
  };

  const retry = (request: ExamAIRequest) => {
    setHasError(false);
    setErrorDetails(null);
    generatePlan(request);
  };

  return {
    generateExamPlan: generatePlan,
    retryGeneration: retry,
    isLoading: isPending,
    isGenerating: isPending, // Keep isGenerating for backward compatibility
    aiPlan,
    analysisProgress,
    hasError,
    errorDetails,
    clearPlan: () => {
      setAiPlan(null);
      setAnalysisProgress(0);
      setHasError(false);
      setErrorDetails(null);
    },
  };
};
