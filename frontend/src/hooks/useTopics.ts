import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ITopic, ITopicsWithCounts, TopicStatus } from "@/types";
import { toast } from "sonner";

const fetchTopicsByExam = async (
  examID: string
): Promise<ITopicsWithCounts> => {
  const { data } = await api.get(`/topic/exam/${examID}`);
  return data;
};

const createTopic = async ({
  name,
  examID,
}: {
  name: string;
  examID: string;
}): Promise<ITopic> => {
  const { data } = await api.post(`/topics`, { name, examID: examID });
  return data;
};

const updateTopic = async ({
  topicID,
  status,
}: {
  topicID: string;
  status: TopicStatus;
}): Promise<ITopic> => {
  const { data } = await api.put(`/topics/${topicID}`, status);
  return data;
};

// Custom hook
export const useTopics = (examID: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["topics", examID];

  const { data, isLoading, isError } = useQuery<ITopicsWithCounts>({
    queryKey,
    queryFn: () => fetchTopicsByExam(examID),
    enabled: !!examID,
  });

  const { mutate: addTopic, isPending: isAdding } = useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      toast.success("Topic added!");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => toast.error("Failed to add topic: " + err.message),
  });

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: updateTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["exams"] }); // Also invalidate exams to update stats
    },
    onError: (err) => toast.error("Failed to update status: " + err.message),
  });

  return {
    data,
    isLoading,
    isError,
    addTopic,
    isAdding,
    updateStatus,
    isUpdatingStatus,
  };
};
