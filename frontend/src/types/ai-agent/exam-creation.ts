export interface TopicSuggestion {
  name: string;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  prerequisites?: string[];
  description?: string;
}

export interface AutoExamCreation {
  title: string;
  totalTopics: number;
  topics: TopicSuggestion[];
  estimatedTotalHours: number;
  examDate: string;
  recommendedStudyStartDate: string;
}