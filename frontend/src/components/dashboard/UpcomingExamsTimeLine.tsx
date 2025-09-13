import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format, differenceInCalendarDays } from "date-fns";
import type { IExamWithStats } from "@/types";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingExamsTimelineProps {
  exams: IExamWithStats[];
}

const getDaysLeftText = (daysLeft: number) => {
  if (daysLeft < 0) return "Overdue";
  if (daysLeft === 0) return "Today!";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft} days left`;
};

export const UpcomingExamsTimeline: React.FC<UpcomingExamsTimelineProps> = ({
  exams,
}) => {
  const today = new Date();

  return (
    <div className="space-y-6">
      {exams.map((exam, index) => {
        const examDate = new Date(exam.examDate);
        const daysLeft = differenceInCalendarDays(examDate, today);
        const progress = Math.round(exam.progress || 0);

        return (
          <div key={exam._id} className="flex gap-4">
            {/* Timeline Line & Dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  daysLeft <= 7
                    ? "bg-red-100 border-red-500"
                    : "bg-gray-100 border-gray-400"
                )}
              >
                <span
                  className={cn("font-bold", daysLeft <= 7 && "text-red-600")}
                >
                  {daysLeft >= 0 ? daysLeft : "!"}
                </span>
              </div>
              {index < exams.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-300" />
              )}
            </div>

            {/* Exam Details Card */}
            <div className="flex-1 p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(examDate, "PPP")}
                  </p>
                </div>
                <div
                  className={cn(
                    "text-sm font-semibold px-2 py-1 rounded",
                    daysLeft <= 7 ? "text-red-700 bg-red-100" : "text-gray-600"
                  )}
                >
                  {getDaysLeftText(daysLeft)}
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Progress
                  </p>
                  <span className="text-sm font-bold">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="text-right mt-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/exams/${exam._id}`}>
                    View Topics <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
