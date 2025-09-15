import { differenceInCalendarDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IExamWithStats } from "@/types";

interface ExamTimeStatsProps {
  exam: IExamWithStats;
}

export function ExamTimeStats({ exam }: ExamTimeStatsProps) {
  const examDate = new Date(exam.examDate);
  const today = new Date();
  const daysLeft = differenceInCalendarDays(examDate, today);
  const isPastDue = daysLeft < 0;
  const progress = Math.round(exam.progress * 100) / 100;

  // Ideal progress based on days left
  const totalDays = 30; // Assuming an average study period of 30 days
  const daysElapsed = totalDays - daysLeft;
  const expectedProgress = Math.min(
    100,
    Math.max(0, (daysElapsed / totalDays) * 100)
  );

  // Calculate if behind, on track, or ahead
  const progressDifference = progress - expectedProgress;
  const status =
    progressDifference >= 10
      ? "ahead"
      : progressDifference >= -10
      ? "onTrack"
      : "behind";

  // Calculate daily progress needed to finish on time
  const remainingProgress = 100 - progress;
  const dailyProgressNeeded =
    daysLeft > 0 ? remainingProgress / daysLeft : remainingProgress;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" /> Time Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Current progress</span>
            <span className="font-medium">{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Expected progress</span>
            <span className="font-medium">{expectedProgress.toFixed(2)}%</span>
          </div>
          <Progress value={expectedProgress} className="h-2 bg-muted" />
        </div>

        {!isPastDue && (
          <div className="bg-muted rounded p-3 text-sm">
            <p className="font-medium mb-1">To finish on time:</p>
            <p>
              Study{" "}
              <span className="font-bold">
                {dailyProgressNeeded.toFixed(2)}%
              </span>{" "}
              each day
            </p>
          </div>
        )}

        <div
          className={cn(
            "p-3 rounded text-sm flex items-start gap-2",
            status === "behind"
              ? "bg-red-50 text-red-700"
              : status === "ahead"
              ? "bg-green-50 text-green-700"
              : "bg-blue-50 text-blue-700"
          )}
        >
          {status === "behind" ? (
            <>
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're behind schedule</p>
                <p className="mt-1">
                  {isPastDue
                    ? "This exam has passed. Consider reviewing what happened and planning better next time."
                    : `You need to increase your pace by ${Math.abs(
                        progressDifference
                      ).toFixed(2)}% to get back on track.`}
                </p>
              </div>
            </>
          ) : status === "ahead" ? (
            <>
              <CheckCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're ahead of schedule!</p>
                <p className="mt-1">
                  Great job! You're {progressDifference.toFixed(2)}% ahead of
                  where you need to be.
                </p>
              </div>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're on track</p>
                <p className="mt-1">
                  Keep up the good work to maintain your progress!
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
