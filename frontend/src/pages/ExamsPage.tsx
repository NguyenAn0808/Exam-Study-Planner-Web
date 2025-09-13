import { useNavigate } from "react-router-dom";
import { useExams } from "@/hooks/useExams";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamCard } from "@/components/exams/ExamCard";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const ExamsPage = () => {
  const { exams, isLoading } = useExams();
  const navigate = useNavigate();

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Exams</h1>
          <p className="text-muted-foreground">
            Here are all your scheduled exams. Click on one to view its topics.
          </p>
        </div>
      </div>

      {exams && exams.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard key={exam._id} exam={exam} />
          ))}
        </div>
      ) : (
        // Trạng thái Rỗng (Empty State)
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 mt-8">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No Exams Found</h2>
          <p className="text-muted-foreground mt-2 mb-4">
            It looks like you haven't added any exams yet.
          </p>
          <Button onClick={() => navigate("/")}> Add Your First Exam</Button>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
