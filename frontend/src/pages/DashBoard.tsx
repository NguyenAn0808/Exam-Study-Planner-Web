import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, TrendingUp, Book, Activity, CheckCircle } from "lucide-react";
import { useExams } from "../hooks/useExams";
import { UpcomingExamsTimeline } from "../components/dashboard/UpcomingExamsTimeLine";
import { StudyFocus } from "../components/dashboard/StudyFocus";
import { cn } from "@/lib/utils";
import { useModal } from "../contexts/ModalContext";
import { StudyTimeDistribution } from "../components/dashboard/StudyTimeDistribution";
import { StudyStreakCalendar } from "../components/dashboard/StudyStreakCalendar";
import { TimeComparisonWidget } from "../components/dashboard/TimeComparisonWidget";
import { RecentActivityFeed } from "../components/dashboard/RecentActivityFeed";
import { TopicCompletionForecast } from "../components/dashboard/TopicCompletionForecast";

export default function DashBoard() {
  const navigate = useNavigate();
  const { openCreateExamModal } = useModal();
  const { exams, isLoading: isLoadingExams } = useExams();

  // Calculate all necessary statistics for the dashboard
  const stats = useMemo(() => {
    // Your existing stats code
    // ...
  }, [exams, isLoadingExams]);

  // Filter for active exams to display in the main content area
  const activeExams = useMemo(() => {
    if (!exams) return [];
    return exams.filter((exam) => exam.progress < 100);
  }, [exams]);

  const upcomingExams = useMemo(() => activeExams.slice(0, 5), [activeExams]);
  const nearestExam = useMemo(
    () => (activeExams.length > 0 ? activeExams[0] : null),
    [activeExams]
  );

  const handleViewAllExams = () => navigate("/exams");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your study overview.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Your existing stat cards */}
        {/* ... */}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Active exams you need to prepare for.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleViewAllExams}>
                View all
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingExams ? (
                <div className="space-y-4">
                  <Skeleton className="h-28 w-full rounded-lg" />
                  <Skeleton className="h-28 w-full rounded-lg" />
                </div>
              ) : upcomingExams.length > 0 ? (
                <UpcomingExamsTimeline exams={upcomingExams} />
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center border-2 border-dashed rounded-lg">
                  <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold">All Caught Up!</h3>
                  <p className="text-muted-foreground mt-1">
                    {exams && exams.length > 0
                      ? "You have completed all your scheduled exams."
                      : "No exams scheduled yet."}
                  </p>
                  <Button
                    variant="default"
                    className="mt-4"
                    onClick={openCreateExamModal}
                  >
                    Add a New Exam
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {nearestExam && (
          <div className="lg:col-span-1 animate-fade-in">
            <StudyFocus nearestExam={nearestExam} />
          </div>
        )}

        {/* New visualization components */}
        <div className="lg:col-span-2">
          <TimeComparisonWidget />
        </div>

        <div className="lg:col-span-1">
          <StudyStreakCalendar />
        </div>

        <div className="lg:col-span-1">
          <StudyTimeDistribution />
        </div>

        <div className="lg:col-span-1">
          <TopicCompletionForecast />
        </div>

        <div className="lg:col-span-1">
          <RecentActivityFeed />
        </div>
      </div>
    </div>
  );
}
