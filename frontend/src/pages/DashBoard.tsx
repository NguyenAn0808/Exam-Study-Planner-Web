import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, ArrowRight, Plus } from "lucide-react";
import { useExams } from "../hooks/useExams";
import { VirtualizedExamsTimeline } from "../components/dashboard/VirtualizedExamsTimeline";
import { useModal } from "../contexts/ModalContext";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  const { openCreateExamModal } = useModal();
  const { exams, isLoading } = useExams();

  // Filter for active exams to display in the main content area
  const activeExams = useMemo(() => {
    if (!exams) return [];
    return exams.filter((exam) => exam.progress < 100);
  }, [exams]);

  // Now we'll show all active exams with virtual scrolling instead of limiting to 5
  const upcomingExams = useMemo(() => activeExams, [activeExams]);
  const nearestExam = useMemo(
    () => (activeExams.length > 0 ? activeExams[0] : null),
    [activeExams]
  );

  const handleViewAllExams = () => navigate("/exams");

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    if (!exams)
      return {
        completedExams: "0",
        totalExams: "0",
        activeTopics: "0",
        topicsCovered: "0",
        totalTopics: "0",
        overallProgress: "0%",
      };

    const completedExams = exams.filter((exam) => exam.progress >= 100).length;
    const totalExams = exams.length;

    const activeTopicsCount = exams.reduce((acc, exam) => {
      return acc + (exam.inProgressTopics || 0);
    }, 0);

    const topicsCovered = exams.reduce((acc, exam) => {
      return acc + (exam.completedTopics || 0);
    }, 0);

    const totalTopics = exams.reduce((acc, exam) => {
      return acc + (exam.totalTopics || 0);
    }, 0);

    const overallProgress =
      totalTopics > 0 ? Math.round((topicsCovered / totalTopics) * 100) : 0;

    return {
      completedExams: `${completedExams}/${totalExams}`,
      totalExams: String(totalExams),
      activeTopics: String(activeTopicsCount),
      topicsCovered: `${topicsCovered}/${totalTopics}`,
      totalTopics: String(totalTopics),
      overallProgress: `${overallProgress}%`,
    };
  }, [exams]);

  return (
    <div className="space-y-8">
      {/* Header with AI Schedule Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your study overview.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={openCreateExamModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Exam
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Exams
            </CardTitle>
            <div className="bg-primary/10 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M9 11V6a3 3 0 0 1 3-3h.75C15 3 15 2 16.5 2s1.5 1 3.75 1h.75a3 3 0 0 1 3 3v5" />
                <path d="M9 11h6l3 9H6l3-9Z" />
                <path d="m17 17 3-3" />
                <path d="M14 17h-4" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedExams}</div>
            <p className="text-xs text-muted-foreground">Exams fully studied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Topics</CardTitle>
            <div className="bg-primary/10 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                <path d="M21 3v3a2 2 0 0 0 2 2h3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 8v1" />
                <path d="M12 15v1" />
                <path d="M16 12h-1" />
                <path d="M9 12H8" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTopics}</div>
            <p className="text-xs text-muted-foreground">
              Topics currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Topics Covered
            </CardTitle>
            <div className="bg-primary/10 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                <path d="M6 8h.01" />
                <path d="M12 8h.01" />
                <path d="M18 8h.01" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topicsCovered}</div>
            <p className="text-xs text-muted-foreground">Across all exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <div className="bg-primary/10 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 20v-6" />
                <path d="M6 20v-6" />
                <path d="M18 20v-6" />
                <path d="M12 14v-4" />
                <path d="M18 14v-4" />
                <path d="M6 14v-4" />
                <rect width="18" height="4" x="3" y="4" rx="2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overallProgress}</div>
            <p className="text-xs text-muted-foreground">
              Based on topics completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {/* Upcoming Deadlines Section */}
        <Card className="col-span-1">
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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-lg" />
              </div>
            ) : upcomingExams.length > 0 ? (
              <VirtualizedExamsTimeline
                exams={upcomingExams}
                height={320} // Fixed height for the virtualized list
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center border-2 border-dashed rounded-lg">
                <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold">All Caught Up!</h3>
                <p className="text-muted-foreground mt-1">
                  {exams && exams.length > 0
                    ? "You have completed all your scheduled exams."
                    : "No exams scheduled yet."}
                </p>
                <div className="flex gap-2">
                  <Button onClick={openCreateExamModal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Exam
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Deadline Section */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <CardTitle>Next Deadline!</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This is your most urgent exam. Focus on its topics.
            </p>
          </CardHeader>
          <CardContent>
            {nearestExam ? (
              <div>
                <h3 className="text-xl font-bold">{nearestExam.title}</h3>
                <p className="text-sm text-muted-foreground my-2">
                  {format(new Date(nearestExam.examDate), "MMMM d, yyyy")}
                </p>
                <div className="space-y-1 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {nearestExam.completedTopics} / {nearestExam.totalTopics}{" "}
                      topics covered
                    </span>
                  </div>
                  <Progress value={nearestExam.progress} className="h-2" />
                </div>
                <ul className="space-y-2 text-sm mt-4">
                  <li className="flex items-center gap-2">
                    - Review remaining topics
                  </li>
                  <li className="flex items-center gap-2">
                    - Practice past papers
                  </li>
                </ul>
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/exams/${nearestExam._id}`}>
                      View Topics <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-muted-foreground">
                  No upcoming exams found.
                </p>
                <Button
                  variant="default"
                  className="mt-4"
                  onClick={openCreateExamModal}
                >
                  Add Your First Exam
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
