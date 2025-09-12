// src/hooks/useTopics.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ITopic, ITopicsWithCounts, TopicStatus } from "@/types";
import { toast } from "sonner";

// Các hàm gọi API, giữ ở dạng private bên trong module
const fetchTopicsByExam = async (
  examID: string
): Promise<ITopicsWithCounts> => {
  const { data } = await api.get(`/exams/${examID}`);
  return data;
};

const createTopic = async ({
  name,
  examID,
}: {
  name: string;
  examID: string;
}): Promise<ITopic> => {
  const { data } = await api.post(`/topics`, { name, examID });
  return data;
};

const updateTopicAPI = async (payload: {
  topicID: string;
  name?: string;
  status?: TopicStatus;
}): Promise<ITopic> => {
  const { topicID, ...updateData } = payload;
  const { data } = await api.put(`/topics/${topicID}`, updateData);
  return data;
};

const deleteTopicAPI = async (topicID: string) => {
  const { data } = await api.delete(`/topics/${topicID}`);
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
    onSuccess: (newTopic) => {
      toast.success("Topic added!");
      queryClient.setQueryData<ITopicsWithCounts>(queryKey, (oldData) => {
        if (!oldData)
          return {
            topics: [newTopic],
            counts: { "Not Started": 1, "In-progress": 0, Completed: 0 },
          };
        return {
          ...oldData,
          topics: [newTopic, ...oldData.topics],
          counts: {
            ...oldData.counts,
            "Not Started": (oldData.counts["Not Started"] || 0) + 1,
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => toast.error("Failed to add topic: " + err.message),
  });

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: (vars: { topicID: string; status: TopicStatus }) =>
      updateTopicAPI(vars),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err) => toast.error("Failed to update status: " + err.message),
  });

  const { mutate: updateTopicName, isPending: isUpdatingName } = useMutation({
    mutationFn: (vars: { topicID: string; name: string }) =>
      updateTopicAPI(vars),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError: (err) =>
      toast.error("Failed to update topic name: " + err.message),
  });

  const { mutate: deleteTopic, isPending: isDeleting } = useMutation({
    mutationFn: deleteTopicAPI,
    onSuccess: (_, topicID) => {
      toast.success("Topic deleted!");
      queryClient.setQueryData<ITopicsWithCounts>(queryKey, (oldData) => {
        if (!oldData) return oldData;
        const deletedTopic = oldData.topics.find((t) => t._id === topicID);
        const updatedTopics = oldData.topics.filter((t) => t._id !== topicID);
        const updatedCounts = { ...oldData.counts };
        if (deletedTopic?.status && updatedCounts[deletedTopic.status] > 0) {
          updatedCounts[deletedTopic.status]--;
        }
        return { ...oldData, topics: updatedTopics, counts: updatedCounts };
      });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => toast.error("Failed to delete topic: " + err.message),
  });

  return {
    data,
    isLoading,
    isError,
    addTopic,
    isAdding,
    updateStatus,
    isUpdatingStatus,
    updateTopicName,
    isUpdatingName,
    deleteTopic,
    isDeleting,
  };
};
