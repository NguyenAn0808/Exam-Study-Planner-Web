import { useCallback } from "react";
import { useStudySessions } from "./useStudySessions";
import { useExams } from "./useExams";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import type { ITopic } from "@/types";

// Create a Set to track notified topics across component instances
const notifiedTopics = new Set<string>();

export const useTopicTimeAlert = () => {
  const { data: sessions } = useStudySessions();
  const { exams } = useExams();

  // Calculate the user's personal time coefficient
  const calculateTimeCoefficient = useCallback(() => {
    if (!sessions || sessions.length === 0) return 1.0;

    let totalEstimated = 0;
    let totalActual = 0;

    // Find topics with both estimated and logged times
    const topicsWithTimes = new Map();

    sessions.forEach((session) => {
      const { topicId, durationMinutes } = session;
      if (!topicsWithTimes.has(topicId)) {
        topicsWithTimes.set(topicId, { actual: 0 });
      }

      const topicData = topicsWithTimes.get(topicId);
      topicData.actual += durationMinutes;
    });

    // Match with estimated times
    let matchedTopics = 0;
    let coefficient = 1.0;

    // Since we don't have direct access to topics through the IExamWithStats interface,
    // we'll simplify and use a default coefficient when exact data isn't available

    // If there's at least one session with actual time, use a standard coefficient
    if (topicsWithTimes.size > 0) {
      let totalActualTime = 0;

      topicsWithTimes.forEach((data) => {
        totalActualTime += data.actual;
      });

      // If we have some data, use a simple coefficient based on total time
      if (totalActualTime > 0) {
        // Use 60 min as default per topic
        const expectedTime = topicsWithTimes.size * 60;
        coefficient = totalActualTime / expectedTime;
        // Ensure coefficient is reasonable
        coefficient = Math.max(1.0, Math.min(3.0, coefficient));
      }
    }

    // Default fallback coefficient
    return coefficient;

    // Calculate average coefficient
    if (matchedTopics > 0 && totalEstimated > 0) {
      coefficient = totalActual / totalEstimated;
    }

    return Math.max(0.5, Math.min(5, coefficient)); // Cap between 0.5x and 5x
  }, [sessions, exams]);

  // Check if user should start studying now based on their coefficient
  const checkShouldStartStudying = useCallback(
    (topic: ITopic) => {
      if (!exams) return false;

      const exam = exams.find((e) => e._id === topic.exam);
      if (!exam) return false;

      // Default to 60 minutes if estimatedMinutes is not set
      const estimatedMinutes = topic.estimatedMinutes || 60;

      const examDate = new Date(exam.examDate);
      const today = new Date();
      const daysLeft = Math.max(0, differenceInCalendarDays(examDate, today));

      // Get the user's time coefficient
      const coefficient = calculateTimeCoefficient();

      // Calculate realistic time needed
      const realisticMinutes = estimatedMinutes * coefficient;

      // Assume student can study 2 hours (120 min) per day effectively
      const daysNeeded = Math.ceil(realisticMinutes / 120);

      // If days needed is >= days left, they should start now
      return daysNeeded >= daysLeft;
    },
    [exams, calculateTimeCoefficient]
  );

  // Generate an alert for a topic if needed
  const generateTopicAlert = useCallback(
    (topic: ITopic) => {
      if (!topic || topic.status === "Completed") return false;

      // Skip if already notified for this topic
      if (notifiedTopics.has(topic._id)) return true;

      const shouldStart = checkShouldStartStudying(topic);
      const coefficient = calculateTimeCoefficient();

      if (shouldStart) {
        // Add to the set of notified topics before showing notification
        notifiedTopics.add(topic._id);

        const message =
          coefficient > 1.3
            ? `Start studying "${
                topic.name
              }" now! Based on your history, you take ${coefficient.toFixed(
                1
              )}x longer than estimated. Prioritize this topic for exam preparation.`
            : `Start studying "${topic.name}" now to ensure completion before the exam!`;

        toast.warning(message, {
          duration: 8000,
        });

        return true;
      }

      return false;
    },
    [checkShouldStartStudying, calculateTimeCoefficient]
  );

  return {
    generateTopicAlert,
    checkShouldStartStudying,
    getTimeCoefficient: calculateTimeCoefficient,
  };
};
