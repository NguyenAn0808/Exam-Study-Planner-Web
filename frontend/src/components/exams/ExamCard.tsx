import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, differenceInCalendarDays } from "date-fns";
import type { IExamWithStats } from "@/types";
import { cn } from "@/lib/utils";

interface IExamCardProps {
  exam: IExamWithStats;
}

export const ExamCard: React.FC<IExamCardProps> = ({ exam }) => {
  const progress = Math.round(exam.progress || 0);
  const today = new Date();
  const examDate = new Date(exam.examDate);
  const daysLeft = differenceInCalendarDays(examDate, today);

  const isUrgent = daysLeft <= 3 && progress < 100;

  return (
    <Link to={`/exams/${exam._id}`} className="block h-full">
      <Card
        className={cn(
          "hover:border-primary transition-colors h-full flex flex-col",
          isUrgent && "border-2",
          isUrgent && daysLeft <= 1 && "border-red-500 hover:border-red-600",
          isUrgent &&
            daysLeft > 1 &&
            "border-orange-500 hover:border-orange-600"
        )}
      >
        <CardHeader>
          <CardTitle className="truncate" title={exam.title}>
            {exam.title}
          </CardTitle>
          <CardDescription>Date: {format(examDate, "PPP")}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-muted-foreground">
                Progress
              </p>
              <span className="text-sm font-bold">{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground pt-1 text-right">
              {exam.completedTopics} / {exam.totalTopics} topics
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
