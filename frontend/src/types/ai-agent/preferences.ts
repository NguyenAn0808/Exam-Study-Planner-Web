// Student preferences type definitions for AI agent system

export interface StudyHabits {
  preferredStudyTime: 'early_morning' | 'morning' | 'afternoon' | 'evening' | 'late_night';
  sessionDuration: number; // in minutes
  breakDuration: number; // in minutes
  energyLevels: {
    morning: 'low' | 'medium' | 'high';
    afternoon: 'low' | 'medium' | 'high';
    evening: 'low' | 'medium' | 'high';
  };
  usePomodoroTechnique: boolean;
  pomodoroSettings?: {
    workMinutes?: number;
    shortBreakMinutes?: number;
    longBreakMinutes?: number;
    cyclesBeforeLongBreak?: number;
  };
}

export interface ExamPreferences {
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetGrade: string; // e.g., "A", "B+", etc.
  currentKnowledgeLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  timeAvailablePerDay: number; // hours
  stressLevel: 'low' | 'medium' | 'high';
  confidenceLevel: 'low' | 'medium' | 'high';
}

export interface LearningPreferences {
  styles: Array<'visual' | 'auditory' | 'kinesthetic' | 'reading_writing'>;
  groupStudy: {
    preferred: boolean;
    frequency: 'never' | 'sometimes' | 'often' | 'always';
    groupSize: number;
  };
  reviewFrequency: 'daily' | 'alternate_days' | 'weekly';
  practiceMethods: Array<'practice_tests' | 'flashcards' | 'summarization' | 'teaching_others'>;
}

export interface StudentPreferences {
  studyHabits: StudyHabits;
  examPreferences: ExamPreferences;
  adaptiveSettings: {
    receiveReminders: boolean;
    adjustForProcrastination: boolean;
    difficultyAdjustment: 'manual' | 'automatic';
    stressManagement: boolean;
  };
}