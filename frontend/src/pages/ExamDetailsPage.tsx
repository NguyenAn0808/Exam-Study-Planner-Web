import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTopics } from "@/hooks/useTopics";
import { AddTopicForm } from "@/components/exams/AddTopicForm";
import { TopicList } from "@/components/exams/TopicList";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { TopicStats } from "@/components/exams/TopicStats";
import { TopicFilters } from "@/components/exams/TopicFilters";
import { TopicPagination } from "@/components/exams/TopicPagination";
import { BookOpen } from "lucide-react";

const TOPICS_PER_PAGE = 5; // You can adjust this number

const ExamDetailsPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const { data, isLoading, addTopic, isAdding } = useTopics(examId!);

  // State for filtering and pagination
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized list of filtered topics
  const filteredTopics = useMemo(() => {
    // Reset to page 1 whenever the data or filter changes to avoid being on a non-existent page
    setCurrentPage(1);

    if (!data?.topics) return [];
    if (filter === "all") {
      return data.topics;
    }
    return data.topics.filter((topic) => topic.status === filter);
  }, [data, filter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTopics.length / TOPICS_PER_PAGE);
  const visibleTopics = useMemo(() => {
    const startIndex = (currentPage - 1) * TOPICS_PER_PAGE;
    return filteredTopics.slice(startIndex, startIndex + TOPICS_PER_PAGE);
  }, [filteredTopics, currentPage]);

  // Main component render logic
  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {data?.title || "Study Topics"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Break down your exam into manageable topics below.
        </p>
      </div>

      {/* Add Topic Form - The primary action for this page */}
      <AddTopicForm
        onSubmit={(name) => addTopic({ name, examID: examId! })}
        isAdding={isAdding}
      />

      {/* Topic List Management Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Topic Management</CardTitle>
            <CardDescription>
              Filter and browse through your topics for this exam.
            </CardDescription>
          </div>
          {/* Filters are only shown if there are topics to filter */}
          {data && data.topics.length > 0 && (
            <TopicFilters filter={filter} setFilter={setFilter} />
          )}
        </CardHeader>
        <CardContent>
          {data && data.topics.length > 0 ? (
            <>
              <TopicStats counts={data.counts} />
              <TopicList topics={visibleTopics} />
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">
                Your study list is empty!
              </h3>
              <p className="text-muted-foreground mt-1">
                Add your first topic above to get started.
              </p>
            </div>
          )}
        </CardContent>
        {/* Pagination is only shown if there is more than one page */}
        {totalPages > 1 && (
          <CardFooter>
            <TopicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ExamDetailsPage;
