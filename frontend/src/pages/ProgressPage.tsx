import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useExams } from "../hooks/useExams";
import { ExamsProgressBarChart } from "../components/progress/ExamProgressBarChart";
import { TopicsStatusPieChart } from "../components/progress/TopicStatusPieChart";
import { BookOpen } from "lucide-react";

export default function ProgressPage() {
  const { exams, isLoading, isError } = useExams();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[350px] w-full rounded-lg" />
          <Skeleton className="h-[350px] w-full rounded-lg" />
        </div>
      );
    }

    if (isError || !exams) {
      return (
        <p className="text-center text-destructive py-16">
          Failed to load progress data. Please try again later.
        </p>
      );
    }

    if (exams.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 mt-8">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No Data to Display</h2>
          <p className="text-muted-foreground mt-2">
            Add an exam and some topics to see your progress charts.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Progress by Exam</CardTitle>
            <p className="text-sm text-muted-foreground pt-1">
              A comparison of your completion rate for each exam.
            </p>
          </CardHeader>
          <CardContent>
            <ExamsProgressBarChart data={exams} />
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Overall Topics Status</CardTitle>
            <p className="text-sm text-muted-foreground pt-1">
              A breakdown of all your topics by their current status.
            </p>
          </CardHeader>
          <CardContent>
            <TopicsStatusPieChart data={exams} />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Details</h1>
        <p className="text-muted-foreground">
          Detailed charts and analytics of your study progress.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
