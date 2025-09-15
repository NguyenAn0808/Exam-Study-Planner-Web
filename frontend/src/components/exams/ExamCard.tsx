import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, differenceInCalendarDays } from "date-fns";
import { MoreHorizontal, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExams } from "@/hooks/useExams";
import { AIExamPlanButton } from "../ai/AIExamPlanButton";
import type { IExamWithStats } from "@/types";

interface IExamCardProps {
  exam: IExamWithStats;
}

export const ExamCard: React.FC<IExamCardProps> = ({ exam }) => {
  const { deleteExam, isDeleting } = useExams();

  const progress = Math.round(exam.progress || 0);
  const today = new Date();
  const examDate = new Date(exam.examDate);
  const daysLeft = differenceInCalendarDays(examDate, today);

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
    <Card
      className={cn(
        "hover:border-primary transition-colors h-full flex flex-col",
        daysLeft <= 3 && progress < 100 && "border-2",
        daysLeft <= 1 &&
          progress < 100 &&
          "border-red-500 hover:border-red-600",
        daysLeft > 1 &&
          daysLeft <= 3 &&
          progress < 100 &&
          "border-orange-500 hover:border-orange-600"
      )}
    >
      <CardHeader className="relative pb-3">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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

      <CardContent className="flex-1 flex flex-col justify-between space-y-4 pt-1">
        <div className="space-y-1">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-muted-foreground">
              Progress
            </p>
            <span className="text-sm font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
          <p className="text-xs text-muted-foreground pt-1 text-right">
            {exam.completedTopics} / {exam.totalTopics} topics
          </p>
        </div>

        {/* Deadline indicator */}
        {daysLeft <= 14 && progress < 100 && (
          <div
            className={cn(
              "px-3 py-2 rounded-md text-sm",
              daysLeft <= 1
                ? "bg-red-50 text-red-700"
                : daysLeft <= 3
                ? "bg-orange-50 text-orange-700"
                : "bg-blue-50 text-blue-700"
            )}
          >
            <p className="font-medium">
              {daysLeft < 0
                ? "Exam date has passed"
                : daysLeft === 0
                ? "Exam is today!"
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} until exam`}
            </p>
          </div>
        )}

        <div className="space-y-2 mt-auto pt-2">
          {/* Enhanced AI Exam Plan Button */}
          <AIExamPlanButton exam={exam} variant="large" />

          {/* View Topics Button */}
          <Button asChild variant="outline" className="w-full">
            <Link
              to={`/exams/${exam._id}`}
              className="flex items-center justify-center"
            >
              View Topics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
