import axios from "@/lib/axios";
import type { IExam } from "@/types";

interface CreateExamParams {
  title: string;
  examDate: string;
  studyDate?: string;
  isAIGenerated?: boolean;
  description?: string;
}

export const createExam = async (params: CreateExamParams) => {
  const { data } = await axios.post<IExam>("/exams", params);
  return data;
};

export const fetchExams = async () => {
  const { data } = await axios.get<IExam[]>("/exams");
  return data;
};

export const fetchExamById = async (examId: string) => {
  const { data } = await axios.get<IExam>(`/exams/${examId}`);
  return data;
};

export const deleteExam = async (examId: string) => {
  await axios.delete(`/exams/${examId}`);
};
