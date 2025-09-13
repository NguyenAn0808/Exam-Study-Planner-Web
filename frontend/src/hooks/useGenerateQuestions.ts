import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

export interface AIQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string; // e.g., "C"
}

interface AIResponse {
  questions: AIQuestion[];
}

const generateQuestionsAPI = async (topicName: string): Promise<AIResponse> => {
  const { data } = await api.post("/ai/generate-questions", { topicName });
  return data;
};

export const useGenerateQuestions = () => {
  return useMutation<AIResponse, Error, string>({
    mutationFn: generateQuestionsAPI,
    onSuccess: () => {
      toast.success("New questions generated successfully!");
    },
    onError: (err) => {
      toast.error("AI failed to generate questions: " + err.message);
    },
  });
};
