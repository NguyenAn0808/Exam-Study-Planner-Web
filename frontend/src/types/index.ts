export type TopicStatus = "Not Started" | "In-progress" | "Completed";

export interface ITopic {
  _id: string;
  name: string;
  status: TopicStatus;
  exam: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExam {
  _id: string;
  title: string;
  examDate: string;
  studyDate?: string;
  endStudyDate?: string;
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
