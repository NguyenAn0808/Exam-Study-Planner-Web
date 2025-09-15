import { calculateProgress, isProgressOnTrack } from "@/lib/timeUtils";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  totalTopics: number;
  completedTopics: number;
  daysRemaining: number;
  totalDays: number;
  className?: string;
}

/**
 * Component to display a progress bar with visual indicators for study progress
 */
export function ProgressBar({
  totalTopics,
  completedTopics,
  daysRemaining,
  totalDays,
  className = ""
}: ProgressBarProps) {
  const progress = calculateProgress(totalTopics, completedTopics);
  const onTrack = isProgressOnTrack(daysRemaining, progress, totalDays);
  
  // Color based on progress status
  const progressColor = onTrack ? "bg-green-500" : "bg-amber-500";
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`${progressColor} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {completedTopics} of {totalTopics} topics completed
        </span>
        <span className={`text-xs font-medium ${onTrack ? 'text-green-600' : 'text-amber-600'}`}>
          {onTrack ? 'On track' : 'Behind schedule'}
        </span>
      </div>
    </div>
  );
}