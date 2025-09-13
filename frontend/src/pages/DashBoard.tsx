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

export default function DashBoard() {
  const navigate = useNavigate();
  const { openCreateExamModal } = useModal();
  const { exams, isLoading: isLoadingExams } = useExams();

  // Calculate all necessary statistics for the dashboard
  const stats = useMemo(() => {
    if (isLoadingExams || !exams) {
      // Return a default state for loading or no data
      return {
        totalExams: 0,
        completedExams: 0,
        topicsCovered: 0,
        totalTopics: 0,
        overallProgress: 0,
        activeTopics: 0,
      };
    }

    const completedExams = exams.filter((exam) => exam.progress >= 100).length;
    const totalTopics = exams.reduce((sum, exam) => sum + exam.totalTopics, 0);
    const topicsCovered = exams.reduce(
      (sum, exam) => sum + exam.completedTopics,
      0
    );
    const overallProgress =
      totalTopics > 0 ? (topicsCovered / totalTopics) * 100 : 0;
    const activeTopics = exams.reduce(
      (sum, exam) => sum + exam.inProgressTopics,
      0
    );

    return {
      totalExams: exams.length,
      completedExams,
      topicsCovered,
      totalTopics,
      overallProgress: Math.round(overallProgress),
      activeTopics,
    };
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Exams
            </CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingExams ? (
              <Skeleton className="h-8 w-1/2 mt-1" />
            ) : (
              <div className="text-2xl font-bold">
                {stats.completedExams}/{stats.totalExams}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Exams fully studied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Topics</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingExams ? (
              <Skeleton className="h-8 w-1/4 mt-1" />
            ) : (
              <div className="text-2xl font-bold">{stats.activeTopics}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Topics currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Topics Covered
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingExams ? (
              <Skeleton className="h-8 w-1/2 mt-1" />
            ) : (
              <div className="text-2xl font-bold">
                {stats.topicsCovered}/{stats.totalTopics}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Across all exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingExams ? (
              <Skeleton className="h-8 w-1/4 mt-1" />
            ) : (
              <div className="text-2xl font-bold">{stats.overallProgress}%</div>
            )}
            <p className="text-xs text-muted-foreground">
              Based on topics completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div
          className={cn(
            "transition-all duration-300",
            nearestExam ? "lg:col-span-2" : "lg:col-span-3"
          )}
        >
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
        {isLoadingExams ? (
          <Skeleton className="h-64 w-full rounded-lg" />
        ) : (
          nearestExam && (
            <div className="lg:col-span-1 animate-fade-in">
              <StudyFocus nearestExam={nearestExam} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
