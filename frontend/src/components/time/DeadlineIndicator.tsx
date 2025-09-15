import { getUrgencyLevel } from "@/lib/timeUtils";

type DeadlineProps = {
  daysRemaining: number;
  showLabel?: boolean;
}

/**
 * Component to display a visual indicator of deadline urgency
 */
export function DeadlineIndicator({ daysRemaining, showLabel = true }: DeadlineProps) {
  const urgency = getUrgencyLevel(daysRemaining);
  
  // Color mapping based on urgency level
  const colors = {
    critical: "bg-red-500",
    high: "bg-orange-500",
    medium: "bg-yellow-500",
    low: "bg-green-500"
  };
  
  // Label text based on urgency level
  const labels = {
    critical: "Past Due!",
    high: "Urgent",
    medium: "Approaching",
    low: "Plenty of time"
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${colors[urgency]}`} />
      {showLabel && (
        <span className="text-sm font-medium">
          {labels[urgency]} {daysRemaining > 0 && `(${daysRemaining} days left)`}
        </span>
      )}
    </div>
  );
}