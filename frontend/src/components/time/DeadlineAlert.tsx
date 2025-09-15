import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDaysRemaining, getUrgencyLevel } from "@/lib/timeUtils";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

type DeadlineAlertProps = {
  examDate: Date | string;
  progress: number;
}

/**
 * Component to display deadline alerts with relevant information and actions
 */
export function DeadlineAlert({ examDate, progress }: DeadlineAlertProps) {
  const daysRemaining = getDaysRemaining(examDate);
  const urgency = getUrgencyLevel(daysRemaining);
  
  // No alert needed if progress is complete
  if (progress >= 100) {
    return (
      <Alert className="border-green-500 bg-green-50">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Study Complete!</AlertTitle>
        <AlertDescription className="text-green-600">
          You've completed all topics for this exam. Good job and good luck!
        </AlertDescription>
      </Alert>
    );
  }
  
  // No alert needed if urgency is low
  if (urgency === 'low') {
    return null;
  }
  
  // Different alert styles based on urgency
  const alertStyles = {
    critical: "border-red-500 bg-red-50",
    high: "border-orange-500 bg-orange-50",
    medium: "border-yellow-500 bg-yellow-50"
  };
  
  const iconStyles = {
    critical: "text-red-600",
    high: "text-orange-600",
    medium: "text-yellow-600"
  };
  
  const titleStyles = {
    critical: "text-red-800",
    high: "text-orange-800",
    medium: "text-yellow-800"
  };
  
  const descriptionStyles = {
    critical: "text-red-600",
    high: "text-orange-600",
    medium: "text-yellow-600"
  };
  
  // Alert messages based on urgency
  const alertMessages = {
    critical: "The exam date has passed! If the date is incorrect, update it in the exam details.",
    high: `Only ${daysRemaining} days left until the exam! Make sure to prioritize your remaining topics.`,
    medium: `The exam is approaching with ${daysRemaining} days left. Keep up with your study schedule.`
  };
  
  // Alert titles based on urgency
  const alertTitles = {
    critical: "Exam Date Passed",
    high: "Urgent: Exam Coming Soon",
    medium: "Exam Approaching"
  };
  
  return (
    <Alert className={alertStyles[urgency]}>
      {urgency === 'critical' ? (
        <AlertCircle className={`h-4 w-4 ${iconStyles[urgency]}`} />
      ) : (
        <Clock className={`h-4 w-4 ${iconStyles[urgency]}`} />
      )}
      <AlertTitle className={titleStyles[urgency]}>{alertTitles[urgency]}</AlertTitle>
      <AlertDescription className={descriptionStyles[urgency]}>
        {alertMessages[urgency]}
      </AlertDescription>
    </Alert>
  );
}