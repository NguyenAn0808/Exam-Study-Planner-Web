import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

interface StudySession {
  _id: string;
  durationMinutes: number;
  examId: string;
  topicId: string;
  examTitle?: string;
  topicName?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const fetchStudySessions = async (): Promise<StudySession[]> => {
  // This will return mock data until your backend endpoint is ready
  try {
    const { data } = await api.get("/sessions");
    return data;
  } catch (error) {
    console.error("Error fetching study sessions:", error);
    // Return mock data as fallback
    return [
      {
        _id: "1",
        durationMinutes: 30,
        examId: "ex1",
        topicId: "t1",
        examTitle: "Web Programming",
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "2",
        durationMinutes: 45,
        examId: "ex1",
        topicId: "t2",
        examTitle: "Web Programming",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: "3",
        durationMinutes: 60,
        examId: "ex2",
        topicId: "t3",
        examTitle: "Data Structures",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }
};

export const useStudySessions = (options?: { limit?: number }) => {
  return useQuery<StudySession[]>({
    queryKey: ["studySessions"],
    queryFn: fetchStudySessions,
    select: (data) => {
      if (options?.limit && data) {
        return data.slice(0, options.limit);
      }
      return data;
    },
    // Prevent constant retries if the endpoint doesn't exist yet
    retry: false,
    refetchOnWindowFocus: false,
  });
};
