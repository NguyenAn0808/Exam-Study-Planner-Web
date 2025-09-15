import axios from '@/lib/axios';
import type { ITopic } from '@/types';

interface CreateTopicParams {
  name: string;
  exam: string;
  status: 'Not Started';
  estimatedMinutes?: number;
}

export const createTopic = async (params: CreateTopicParams) => {
  // Transform the param to match backend's expected format
  const { exam, ...rest } = params;
  const { data } = await axios.post<ITopic>('/topics', {
    ...rest,
    examID: exam // Convert "exam" to "examID" to match backend expectation
  });
  return data;
};

export const fetchTopicsForExam = async (examId: string) => {
  const { data } = await axios.get<ITopic[]>(`/exams/${examId}/topics`);
  return data;
};

export const updateTopicStatus = async (topicId: string, status: 'Not Started' | 'In-progress' | 'Completed') => {
  const { data } = await axios.patch<ITopic>(`/topics/${topicId}`, { status });
  return data;
};

export const deleteTopic = async (topicId: string) => {
  await axios.delete(`/topics/${topicId}`);
};