import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountdownTimer } from "@/components/time/CountdownTimer";
import { DeadlineIndicator } from "@/components/time/DeadlineIndicator";
import { ProgressBar } from "@/components/time/ProgressBar";
import { getDaysRemaining } from "@/lib/timeUtils";

type ExamTimeCardProps = {
  examName: string;
  examDate: Date | string;
  totalTopics: number;
  completedTopics: number;
  studyStartDate: Date | string;
}

/**
 * Component to display exam time information in a card format
 */
export function ExamTimeCard({ 
  examName, 
  examDate, 
  totalTopics, 
  completedTopics,
  studyStartDate
}: ExamTimeCardProps) {
  const daysRemaining = getDaysRemaining(examDate);
  const startDateObj = typeof studyStartDate === "string" ? new Date(studyStartDate) : studyStartDate;
  const endDateObj = typeof examDate === "string" ? new Date(examDate) : examDate;
  
  // Calculate total study days
  const totalDays = Math.max(1, Math.floor((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{examName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CountdownTimer targetDate={examDate} className="mb-4" />
          
          <div className="flex items-center justify-between">
            <DeadlineIndicator daysRemaining={daysRemaining} />
          </div>
          
          <ProgressBar 
            totalTopics={totalTopics}
            completedTopics={completedTopics}
            daysRemaining={daysRemaining}
            totalDays={totalDays}
            className="mt-4"
          />
        </div>
      </CardContent>
    </Card>
  );
}