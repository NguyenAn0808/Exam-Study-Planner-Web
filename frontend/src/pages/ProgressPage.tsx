import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useExams } from "@/hooks/useExams";
import { ExamsProgressBarChart } from "@/components/progress/ExamProgressBarChart";
import { TopicsStatusPieChart } from "@/components/progress/TopicStatusPieChart";

export default function ProgressPage() {
  const { exams, isLoading, isError } = useExams();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      );
    }

    if (isError || !exams) {
      return <p className="text-destructive">Failed to load progress data.</p>;
    }

    if (exams.length === 0) {
      return (
        <p className="text-center text-muted-foreground">
          No data to display. Add an exam to see your progress.
        </p>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Progress by Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <ExamsProgressBarChart data={exams} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overall Topics Status</CardTitle>
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
