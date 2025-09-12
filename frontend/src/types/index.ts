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
  topics: ITopic[];
  counts: {
    "Not Started": number;
    "In-progress": number;
    Completed: number;
  };
}
