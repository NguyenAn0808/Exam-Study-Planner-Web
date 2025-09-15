import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { IExamWithStats } from "@/types";

interface StudyFocusProps {
  nearestExam: IExamWithStats | null;
}

export const StudyFocus: React.FC<StudyFocusProps> = ({ nearestExam }) => {
  if (!nearestExam) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Study Focus</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Add an exam to see what you should focus on.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-blue-800">Next Deadline!</CardTitle>
        </div>
        <CardDescription>
          This is your most urgent exam. Focus on its topics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold">{nearestExam.title}</h3>
        <p className="text-muted-foreground mb-4">
          {nearestExam.completedTopics} / {nearestExam.totalTopics} topics
          covered
        </p>
        {/* Bạn có thể thêm một API call nhỏ ở đây để lấy 3 topic chưa học */}
        <ul className="space-y-2 text-sm">
          <li>- Review remaining topics</li>
          <li>- Practice past papers</li>
        </ul>
      </CardContent>
    </Card>
  );
};
