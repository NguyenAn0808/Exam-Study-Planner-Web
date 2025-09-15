import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ITopic } from "@/types";

export const useAllTopics = () => {
  return useQuery<ITopic[]>({
    queryKey: ["allTopics"],
    queryFn: async () => {
      const { data } = await api.get("/topics");
      return data;
    },
  });
};
