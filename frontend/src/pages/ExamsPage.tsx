import { useNavigate } from "react-router-dom";
import { useExams } from "@/hooks/useExams";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamCard } from "@/components/exams/ExamCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useEffect, useState, useRef } from "react";
import type { IExamWithStats } from "@/types";
import { useIntersection } from "@/hooks/useIntersection";

const ITEMS_PER_PAGE = 9;

const ExamsPage = () => {
  const { exams, isLoading } = useExams();
  const navigate = useNavigate();
  const { openCreateExamModal } = useModal();

  const [visibleExams, setVisibleExams] = useState<IExamWithStats[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reference for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(loadMoreRef, {
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px", // Load more when 200px from bottom
  });

  // Load more exams when scrolling to the bottom
  useEffect(() => {
    if (!isLoading && exams && exams.length > 0) {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const nextBatch = exams.slice(startIndex, endIndex);

      setVisibleExams(nextBatch);
      setHasMore(endIndex < exams.length);
    }
  }, [exams, isLoading, page]);

  // Load more when scrolling to the bottom
  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isIntersecting, hasMore, isLoading]);

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
            Manage all your exams in one place.
          </p>
        </div>
        <Button onClick={openCreateExamModal} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add New Exam
        </Button>
      </div>

      {exams && exams.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}
          </div>

          {/* Intersection observer target for infinite scroll */}
          {hasMore && (
            <div ref={loadMoreRef} className="py-4 flex justify-center">
              <Skeleton className="h-10 w-40" />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 mt-8">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No Exams Yet</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Start by adding your first exam.
          </p>
          <Button onClick={openCreateExamModal}>
            <Plus className="mr-2 h-4 w-4" /> Add New Exam
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
