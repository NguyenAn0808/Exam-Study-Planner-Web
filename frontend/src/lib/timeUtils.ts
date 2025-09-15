import { format, formatDistance, differenceInDays, isBefore, isAfter, addDays } from "date-fns";

/**
 * Format a date for display
 * @param date Date to format
 * @returns Formatted date string (e.g., "Jan 12, 2023")
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy");
};

/**
 * Format a date with time for display
 * @param date Date to format
 * @returns Formatted date string with time (e.g., "Jan 12, 2023 at 3:45 PM")
 */
export const formatDateWithTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy 'at' h:mm a");
};

/**
 * Get relative time description (e.g., "2 days ago", "in 3 days")
 * @param date Date to compare
 * @returns Relative time description
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns True if the date is in the past
 */
export const isPastDate = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isBefore(dateObj, new Date());
};

/**
 * Check if a date is in the future
 * @param date Date to check
 * @returns True if the date is in the future
 */
export const isFutureDate = (date: Date | string): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isAfter(dateObj, new Date());
};

/**
 * Get days remaining until a date
 * @param date Target date
 * @returns Number of days remaining (negative if date is in the past)
 */
export const getDaysRemaining = (date: Date | string): number => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return differenceInDays(dateObj, new Date());
};

/**
 * Get urgency level based on days remaining
 * @param daysRemaining Number of days remaining
 * @returns Urgency level: "critical", "high", "medium", "low"
 */
export const getUrgencyLevel = (daysRemaining: number): "critical" | "high" | "medium" | "low" => {
  if (daysRemaining < 0) return "critical"; // Past due
  if (daysRemaining <= 3) return "high";
  if (daysRemaining <= 7) return "medium";
  return "low";
};

/**
 * Calculate study progress percentage
 * @param totalTopics Total number of topics
 * @param completedTopics Number of completed topics
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (totalTopics: number, completedTopics: number): number => {
  if (totalTopics === 0) return 0;
  const progress = (completedTopics / totalTopics) * 100;
  return Math.round(progress);
};

/**
 * Check if progress is on track based on days remaining and completion percentage
 * @param daysRemaining Days remaining until deadline
 * @param progress Current progress percentage (0-100)
 * @param totalDays Total days allocated for the task
 * @returns True if progress is on track
 */
export const isProgressOnTrack = (
  daysRemaining: number,
  progress: number,
  totalDays: number
): boolean => {
  if (totalDays <= 0) return progress === 100;
  
  const daysElapsed = totalDays - daysRemaining;
  const expectedProgress = (daysElapsed / totalDays) * 100;
  
  // On track if actual progress is at least 90% of expected progress
  return progress >= expectedProgress * 0.9;
};

/**
 * Generate recommended study dates based on topics and deadline
 * @param topicsCount Number of topics
 * @param startDate Study start date
 * @param endDate Exam deadline date
 * @returns Array of recommended study dates with topic allocation
 */
export const generateStudyPlan = (
  topicsCount: number,
  startDate: Date | string,
  endDate: Date | string
): Array<{ date: Date; topicIndices: number[] }> => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  
  const totalDays = Math.max(1, differenceInDays(end, start));
  const topicsPerDay = Math.ceil(topicsCount / totalDays);
  
  const studyPlan = [];
  let topicIndex = 0;
  
  for (let day = 0; day < totalDays; day++) {
    const date = addDays(start, day);
    const dayTopics = [];
    
    for (let i = 0; i < topicsPerDay && topicIndex < topicsCount; i++) {
      dayTopics.push(topicIndex);
      topicIndex++;
    }
    
    if (dayTopics.length > 0) {
      studyPlan.push({
        date,
        topicIndices: dayTopics,
      });
    }
  }
  
  return studyPlan;
};