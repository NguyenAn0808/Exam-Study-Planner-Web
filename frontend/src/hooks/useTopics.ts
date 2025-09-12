import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ITopic, ITopicsWithCounts, TopicStatus } from "@/types";
import { toast } from "sonner";

const fetchTopicsByExam = async (
  examID: string
): Promise<ITopicsWithCounts> => {
  const { data } = await api.get(`/exams/${examID}`);
  return data;
};

const createTopicAPI = async ({
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
  await api.delete(`/topics/${topicID}`);
  return { success: true, topicID };
};

export const useTopics = (examID: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["topics", examID];

  const { data, isLoading, isError } = useQuery<ITopicsWithCounts>({
    queryKey,
    queryFn: () => fetchTopicsByExam(examID),
    enabled: !!examID,
  });

  const { mutate: addTopic, isPending: isAdding } = useMutation({
    mutationFn: createTopicAPI,
    onSuccess: (newTopic) => {
      toast.success(`Topic "${newTopic.name}" added!`);
      queryClient.setQueryData<ITopicsWithCounts>(queryKey, (oldData) => {
        if (!oldData) {
          return {
            topics: [newTopic],
            counts: { "Not Started": 1, "In-progress": 0, Completed: 0 },
          };
        }
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

  const { mutate: updateTopic, isPending: isUpdating } = useMutation({
    mutationFn: updateTopicAPI,
    onMutate: async (updatedTopicData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousTopicsData =
        queryClient.getQueryData<ITopicsWithCounts>(queryKey);

      queryClient.setQueryData<ITopicsWithCounts>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        let oldStatus: TopicStatus | undefined;
        const originalTopic = oldData.topics.find(
          (t) => t._id === updatedTopicData.topicID
        );
        if (originalTopic) oldStatus = originalTopic.status;

        const updatedTopics = oldData.topics.map((topic) =>
          topic._id === updatedTopicData.topicID
            ? { ...topic, ...updatedTopicData }
            : topic
        );

        let updatedCounts = { ...oldData.counts };
        const newStatus = updatedTopicData.status;

        if (newStatus && oldStatus && newStatus !== oldStatus) {
          if (updatedCounts[oldStatus] > 0) updatedCounts[oldStatus]--;
          updatedCounts[newStatus] = (updatedCounts[newStatus] || 0) + 1;
        }

        return { ...oldData, topics: updatedTopics, counts: updatedCounts };
      });

      return { previousTopicsData };
    },
    onSuccess: () => {
      toast.success("Topic updated!");
    },
    onError: (err, _, context) => {
      toast.error("Update failed, rolling back.");
      if (context?.previousTopicsData) {
        queryClient.setQueryData(queryKey, context.previousTopicsData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  const { mutate: deleteTopic, isPending: isDeleting } = useMutation({
    mutationFn: deleteTopicAPI,
    onSuccess: (data) => {
      const { topicID } = data;
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
    updateTopic,
    isUpdating,
    deleteTopic,
    isDeleting,
  };
};
