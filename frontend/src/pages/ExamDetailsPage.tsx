import { useParams } from "react-router-dom";
import { useTopics } from "@/hooks/useTopics";
import { AddTopicForm } from "@/components/exams/AddTopicForm";
import { TopicList } from "@/components/exams/TopicList";
import { Skeleton } from "@/components/ui/skeleton";

const ExamDetailsPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const { data, isLoading, addTopic, isAdding } = useTopics(examId!);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-[#fefcff] relative -m-6 p-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800">Study Topics</h1>
          </div>
          <AddTopicForm
            onSubmit={(name) => addTopic({ name, examID: examId! })}
            isAdding={isAdding}
          />
          <TopicList topics={data?.topics || []} />
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
