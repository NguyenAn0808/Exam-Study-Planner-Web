import { useState, useCallback } from 'react';
import type { StudentPreferences } from '../types/ai-agent/preferences';
import type { StudyPlan } from '../types/ai-agent/study-plan';
import AIStudyAgent from '../services/AIStudyAgent';

interface UseAIStudyAgent {
  loading: boolean;
  error: string | null;
  studyPlan: StudyPlan | null;
  generatePlan: (preferences: StudentPreferences, examDate: Date, subject: string) => Promise<void>;
  updateProgress: (completedTopics: string[], assessmentResults: { topic: string; score: number }[]) => Promise<void>;
}

export function useAIStudyAgent(): UseAIStudyAgent {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [agent, setAgent] = useState<AIStudyAgent | null>(null);

  const generatePlan = useCallback(async (
    preferences: StudentPreferences,
    examDate: Date,
    subject: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Create a new AI agent instance
      const newAgent = new AIStudyAgent(preferences, examDate, subject);
      setAgent(newAgent);

      // Generate the study plan
      const plan = newAgent.generateStudyPlan();
      setStudyPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate study plan');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (
    completedTopics: string[],
    assessmentResults: { topic: string; score: number }[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      if (!agent) {
        throw new Error('No active study plan. Please generate a plan first.');
      }

      // Update the progress in the agent
      agent.updateProgress(completedTopics, assessmentResults);

      // Regenerate the plan with updated progress
      const updatedPlan = agent.generateStudyPlan();
      setStudyPlan(updatedPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
    } finally {
      setLoading(false);
    }
  }, [agent]);

  return {
    loading,
    error,
    studyPlan,
    generatePlan,
    updateProgress,
  };
}