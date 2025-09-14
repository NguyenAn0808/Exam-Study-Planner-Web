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
import { useExams } from "@/hooks/useExams";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface IExamCardProps {
  exam: IExamWithStats;
}

export const ExamCard: React.FC<IExamCardProps> = ({ exam }) => {
  const { deleteExam, isDeleting } = useExams();
  const progress = Math.round(exam.progress || 0);
  const today = new Date();
  const examDate = new Date(exam.examDate);
  const daysLeft = differenceInCalendarDays(examDate, today);

  const isUrgent = daysLeft <= 3 && progress < 100;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm(
        `Are you sure you want to delete "${exam.title}"? This will delete all associated topics and cannot be undone.`
      )
    ) {
      deleteExam(exam._id);
    }
  };

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
        <CardHeader className="relative">
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={isDeleting}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Exam
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
