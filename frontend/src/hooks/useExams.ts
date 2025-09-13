import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/axios";
import type { IExam, IExamWithStats } from "@/types";

const fetchExams = async (): Promise<IExamWithStats[]> => {
  const { data } = await api.get("/exams");
  return data;
};

const createExam = async (examData: {
  title: string;
  examDate: Date;
}): Promise<IExam> => {
  const { data } = await api.post("/exams", examData);
  return data;
};

export const useExams = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: exams,
    isLoading,
    isError,
  } = useQuery<IExamWithStats[]>({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });

  const { mutate: createExamMutation, isPending: isCreating } = useMutation({
    mutationFn: createExam,
    onSuccess: (newExam) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success(`Exam "${newExam.title}" created successfully!`);
      navigate(`/exams/${newExam._id}`);
    },
    onError: (error) => {
      toast.error("Failed to create exam: " + error.message);
    },
  });

  return {
    exams,
    isLoading,
    isError,
    createExam: createExamMutation,
    isCreating,
  };
};
