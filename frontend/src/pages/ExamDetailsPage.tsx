import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTopics } from "@/hooks/useTopics";
import { useExams } from "@/hooks/useExams";
import { AddTopicForm } from "@/components/exams/AddTopicForm";
import { TopicList } from "@/components/exams/TopicList";
import { Skeleton } from "@/components/ui/skeleton";
import { differenceInCalendarDays, format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TopicStats } from "@/components/exams/TopicStats";
import { TopicFilters } from "@/components/exams/TopicFilters";
import {
  BookOpen,
  Trash2,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useAI } from "@/contexts/AIContext";
import { LogStudySessionModal } from "@/components/sessions/LogStudySessionModal";
import { cn } from "@/lib/utils";
import type { ITopic, IExamWithStats } from "@/types";

interface ExamTimeStatsProps {
  exam: IExamWithStats;
}

export function ExamTimeStats({ exam }: ExamTimeStatsProps) {
  const examDate = new Date(exam.examDate);
  const today = new Date();
  const daysLeft = differenceInCalendarDays(examDate, today);
  const isPastDue = daysLeft < 0;
  const progress = Math.round(exam.progress * 100) / 100;

  // Ideal progress based on days left
  const totalDays = 30; // Assuming an average study period of 30 days
  const daysElapsed = totalDays - daysLeft;
  const expectedProgress = Math.min(
    100,
    Math.max(0, (daysElapsed / totalDays) * 100)
  );

  // Calculate if behind, on track, or ahead
  const progressDifference = progress - expectedProgress;
  const status =
    progressDifference >= 10
      ? "ahead"
      : progressDifference >= -10
      ? "onTrack"
      : "behind";

  // Calculate daily progress needed to finish on time
  const remainingProgress = 100 - progress;
  const dailyProgressNeeded =
    daysLeft > 0 ? remainingProgress / daysLeft : remainingProgress;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" /> Time Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Current progress</span>
            <span className="font-medium">{progress.toFixed(2)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Expected progress</span>
            <span className="font-medium">{expectedProgress.toFixed(2)}%</span>
          </div>
          <Progress value={expectedProgress} className="h-2 bg-muted" />
        </div>

        {!isPastDue && (
          <div className="bg-muted rounded p-3 text-sm">
            <p className="font-medium mb-1">To finish on time:</p>
            <p>
              Study{" "}
              <span className="font-bold">
                {dailyProgressNeeded.toFixed(2)}%
              </span>{" "}
              each day
            </p>
          </div>
        )}

        <div
          className={cn(
            "p-3 rounded text-sm flex items-start gap-2",
            status === "behind"
              ? "bg-red-50 text-red-700"
              : status === "ahead"
              ? "bg-green-50 text-green-700"
              : "bg-blue-50 text-blue-700"
          )}
        >
          {status === "behind" ? (
            <>
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're behind schedule</p>
                <p className="mt-1">
                  {isPastDue
                    ? "This exam has passed. Consider reviewing what happened and planning better next time."
                    : `You need to increase your pace by ${Math.abs(
                        progressDifference
                      ).toFixed(2)}% to get back on track.`}
                </p>
              </div>
            </>
          ) : status === "ahead" ? (
            <>
              <CheckCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're ahead of schedule!</p>
                <p className="mt-1">
                  Great job! You're {progressDifference.toFixed(2)}% ahead of
                  where you need to be.
                </p>
              </div>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're on track</p>
                <p className="mt-1">
                  Keep up the good work to maintain your progress!
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExamDetailsPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { deleteExam, isDeleting } = useExams();
  const { data, isLoading, addTopic, isAdding } = useTopics(examId!);
  const { generateStudyPlan, loading: isGeneratingPlan } = useAI();

  // State for filtering
  const [filter, setFilter] = useState("all");
  
  // State to control AI plan visualization
  const [aiPlanVisible, setAiPlanVisible] = useState(false);

  // State to control the Log Session modal and track the selected topic
  const [isLogSessionModalOpen, setLogSessionModalOpen] = useState(false);
  const [selectedTopicForLog, setSelectedTopicForLog] = useState<ITopic | null>(
    null
  );
  
  // Handle AI Study Plan generation
  const handleGeneratePlan = async () => {
    if (!data) return;
    
    try {
      const preferences = {
        studyHabits: {
          preferredStudyTime: "morning" as const,
          sessionDuration: 45,
          breakDuration: 15,
          energyLevels: {
            morning: "high" as const,
            afternoon: "medium" as const,
            evening: "medium" as const,
          },
          usePomodoroTechnique: true,
        },
        examPreferences: {
          difficultyLevel: "intermediate" as const,
          targetGrade: "A",
          currentKnowledgeLevel: "intermediate" as const,
          timeAvailablePerDay: 2,
          stressLevel: "medium" as const,
          confidenceLevel: "medium" as const,
        },
        adaptiveSettings: {
          receiveReminders: true,
          adjustForProcrastination: true,
          difficultyAdjustment: "automatic" as const,
          stressManagement: true,
        },
      };
      
      await generateStudyPlan(preferences, new Date(data.examDate), data.title);
      setAiPlanVisible(true);
      
      // Fetch updated data after plan generation
      setTimeout(() => {
        // This will refresh the page data to show newly added topics
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error generating AI plan:', error);
    }
  };

  // This function is passed down to TopicCard to open the modal for a specific topic
  const handleOpenLogTimeModal = (topic: ITopic) => {
    setSelectedTopicForLog(topic);
    setLogSessionModalOpen(true);
  };

  const handleDeleteExam = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${data?.title}"? This will delete all associated topics and cannot be undone.`
      )
    ) {
      deleteExam(examId!);
    }
  };

  // Memoized list of filtered topics
  const filteredTopics = useMemo(() => {
    if (!data?.topics) return [];
    if (filter === "all") {
      return data.topics;
    }
    return data.topics.filter((topic) => topic.status === filter);
  }, [data, filter]);

  // Calculate days remaining until exam
  const getDaysRemaining = () => {
    if (!data?.examDate) return 0;
    const examDate = new Date(data.examDate);
    const today = new Date();
    return differenceInCalendarDays(examDate, today);
  };

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

  const daysRemaining = getDaysRemaining();
  const isUrgent = daysRemaining <= 7;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/exams")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exams
        </Button>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleGeneratePlan}
            disabled={isGeneratingPlan}
            className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGeneratingPlan ? "Generating..." : "Generate AI Study Plan"}
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteExam}
            disabled={isDeleting}
            className="mb-4"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Exam
          </Button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {data?.title || "Study Topics"}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Break down your exam into manageable topics below.
        </p>
      </div>

      {/* Urgent Alert */}
      {isUrgent && (
        <div
          className={cn(
            "p-4 border rounded-lg flex items-center gap-3",
            daysRemaining <= 3
              ? "bg-red-50 border-red-200"
              : "bg-amber-50 border-amber-200"
          )}
        >
          <AlertCircle
            className={cn(
              "h-5 w-5",
              daysRemaining <= 3 ? "text-red-500" : "text-amber-500"
            )}
          />
          <div>
            <h3 className="font-medium">Urgent: Exam Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              {daysRemaining <= 0
                ? "Exam is today! Make sure to prioritize your remaining topics."
                : `Only ${daysRemaining} day${
                    daysRemaining === 1 ? "" : "s"
                  } left until the exam! Make sure to prioritize your remaining topics.`}
            </p>
          </div>
        </div>
      )}

      {/* Add Topic Form */}
      <AddTopicForm
        onSubmit={(name, estimatedMinutes) =>
          addTopic({ name, examID: examId!, estimatedMinutes })
        }
        isAdding={isAdding}
      />

      {/* Topic List Management Card */}
      {/* AI Study Plan Visualization */}
      {aiPlanVisible && data && (
        <Card className="shadow-lg mb-8 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Study Plan
            </CardTitle>
            <CardDescription>
              AI-generated study plan to help you prepare efficiently for your exam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-3">Study Schedule</h3>
                {data.topics.length > 0 ? (
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">
                        Optimized schedule for {data.title}
                      </p>
                      <p className="text-sm font-medium">
                        {data.topics.length} topics
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {data.topics.map((topic) => (
                        <div key={topic._id} className="flex items-center justify-between p-2 border-b">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              topic.status === "Completed" ? "bg-green-500" : 
                              topic.status === "In-progress" ? "bg-amber-500" : "bg-gray-300"
                            }`} />
                            <span>{topic.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor((topic.estimatedMinutes || 45) / 60)} hours {(topic.estimatedMinutes || 45) % 60} min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No topics available yet.</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Study Tips</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Start with the most challenging topics when your energy is highest</li>
                  <li>Use active recall techniques for better retention</li>
                  <li>Take regular breaks to maintain focus and productivity</li>
                  <li>Review material frequently to reinforce learning</li>
                  <li>Create summary sheets for quick pre-exam review</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Topic Management</CardTitle>
            <CardDescription>
              Filter and browse through your topics for this exam.
            </CardDescription>
          </div>
          {data && data.topics.length > 0 && (
            <TopicFilters filter={filter} setFilter={setFilter} />
          )}
        </CardHeader>
        <CardContent>
          {data && data.topics.length > 0 ? (
            <>
              <TopicStats counts={data.counts} />
              <TopicList
                topics={filteredTopics}
                onLogTimeClick={handleOpenLogTimeModal}
              />
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
      </Card>

      {selectedTopicForLog && (
        <LogStudySessionModal
          isOpen={isLogSessionModalOpen}
          onOpenChange={setLogSessionModalOpen}
          examId={examId!}
          examTitle={data?.title || ""}
          topic={selectedTopicForLog}
        />
      )}
    </div>
  );
}
