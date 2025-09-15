export type TopicStatus = "Not Started" | "In-progress" | "Completed";

export interface ITopic {
  _id: string;
  name: string;
  status: TopicStatus;
  exam: string;
  createdAt: string;
  updatedAt: string;
  estimatedMinutes?: number; // Optional estimated minutes for study time
}

export interface IExam {
  _id: string;
  title: string;
  examDate: string;
  studyDate?: string;
  endStudyDate?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  totalTopics: number;
  completedTopics: number;
  progress: number;
}

export interface ITopicsWithCounts {
  _id: string;
  title: string;
  examDate: string;
  studyDate?: string;
  endStudyDate?: string;
  isAIGenerated?: boolean;
  topics: ITopic[];
  counts: {
    "Not Started": number;
    "In-progress": number;
    Completed: number;
  };
}

export interface IExamWithStats {
  _id: string;
  title: string;
  examDate: string;
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  progress: number;
  isAIGenerated?: boolean;
}

export interface IActivity {
  _id: string;
  action:
    | "CREATED_EXAM"
    | "DELETED_EXAM"
    | "CREATED_TOPIC"
    | "DELETED_TOPIC"
    | "COMPLETED_TOPIC"
    | "UNCOMPLETED_TOPIC";
  details: string;
  examId: string;
  createdAt: string;
}
