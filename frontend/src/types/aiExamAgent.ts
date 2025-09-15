// Type definitions for AI Exam Agent

export interface ExamAIRequest {
  subject: string;
  topics: string[];
  examDate: Date;
  preferences?: Record<string, any>;
}

export interface AIExamPlan {
  plan: string;
  recommendedTopics: string[];
  studySchedule: Array<{
    date: string;
    topics: string[];
  }>;
}
