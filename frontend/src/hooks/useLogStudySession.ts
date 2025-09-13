import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

interface LogSessionPayload {
  durationMinutes: number;
  examId: string;
  topicId: string;
}

const logSessionAPI = async (payload: LogSessionPayload) => {
  const { data } = await api.post("/sessions", payload);
  return data;
};

export const useLogStudySession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logSessionAPI,
    onSuccess: () => {
      toast.success("Study session logged successfully!");
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (err) => {
      toast.error("Failed to log session: " + err.message);
    },
  });
};
