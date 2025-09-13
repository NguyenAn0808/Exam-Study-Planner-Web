import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { IActivity } from "@/types";

export const useActivities = () => {
  return useQuery<IActivity[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data } = await api.get("/activities");
      return data;
    },
    refetchInterval: 30000, // 30 giây
  });
};
