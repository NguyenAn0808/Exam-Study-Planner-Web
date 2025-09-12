import { Link } from "react-router-dom";
import { useExams } from "@/hooks/useExams";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

const ExamsPage = () => {
  const { exams, isLoading } = useExams();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">My Exams</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Exams</h1>
      {exams && exams.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <Link to={`/exams/${exam._id}`} key={exam._id} className="block">
              <Card className="hover:border-primary transition-colors h-full">
                <CardHeader>
                  <CardTitle>{exam.title}</CardTitle>
                  <CardDescription>
                    Date: {format(new Date(exam.examDate), "PPP")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Progress
                    </p>
                    <Progress value={exam.progress} />
                    <p className="text-xs text-muted-foreground">
                      {exam.completedTopics} / {exam.totalTopics} topics
                      completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-8">
          No exams found. Add your first one from the header!
        </p>
      )}
    </div>
  );
};

export default ExamsPage;
