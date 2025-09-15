// Types for the AI-generated study plan

export interface StudySession {
  startTime: string;
  duration: number; // in minutes
  topic: string;
  activityType: 'study' | 'practice' | 'review' | 'break';
  description: string;
  recommendedMethod: string;
  materials?: string[];
}

export interface DailySchedule {
  date: string;
  totalStudyTime: number; // in minutes
  sessions: StudySession[];
  dailyGoals: string[];
  adaptiveNotes?: string[]; // AI feedback based on previous performance
}

export interface WeeklyMilestone {
  weekNumber: number;
  startDate: string;
  endDate: string;
  topics: string[];
  expectedProgress: string;
  assessmentCriteria: string[];
}

export interface StudyPlan {
  studentId: string;
  subject: string;
  examDate: string;
  targetGrade: string;
  totalWeeks: number;
  weeklySchedule: WeeklyMilestone[];
  dailySchedules: DailySchedule[];
  adaptiveRecommendations: {
    studyTechniques: string[];
    timeManagement: string[];
    stressManagement: string[];
    examPreparation: string[];
  };
  progressTracking: {
    completedTopics: string[];
    masteredConcepts: string[];
    areasForImprovement: string[];
    overallProgress: number; // percentage
  };
}