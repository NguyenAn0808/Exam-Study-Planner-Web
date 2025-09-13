// src/components/exams/ExamCard.tsx

import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import type { IExamWithStats } from "@/types"; // Giả sử bạn có type này

interface ExamCardProps {
  exam: IExamWithStats;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const progress = Math.round(exam.progress || 0);

  return (
    <Link to={`/exams/${exam._id}`} className="block">
      <Card className="hover:border-primary transition-colors h-full flex flex-col">
        <CardHeader>
          <CardTitle className="truncate">{exam.title}</CardTitle>
          <CardDescription>
            Date: {format(new Date(exam.examDate), "PPP")}
          </CardDescription>
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
