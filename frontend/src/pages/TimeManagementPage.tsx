import { useExams } from "@/hooks/useExams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, AlertCircle } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import type { IExamWithStats } from "@/types";

export default function TimeManagementPage() {
  const { exams, isLoading } = useExams();

  // Create a reference to the parent container for virtual scrolling
  const parentRef = useRef<HTMLDivElement>(null);

  // Set up virtualizer for exams
  const examVirtualizer = useVirtualizer({
    count: exams?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 180, // Estimated height of each exam card
    overscan: 3, // Number of items to render before/after the visible area
  });

  // Generate encouraging messages based on exam status
  const getExamStatusMessage = (
    exam: IExamWithStats
  ): { message: string; type: "success" | "warning" | "danger" | "info" } => {
    const today = new Date();
    const examDate = new Date(exam.examDate);
    const daysLeft = differenceInCalendarDays(examDate, today);
    const progress = Math.round((exam.progress || 0) * 100) / 100; // Round to 2 decimal places

    // Exam is complete
    if (progress >= 100) {
      return {
        message: "Great job! You've completed all topics for this exam.",
        type: "success",
      };
    }

    // Exam is past due
    if (daysLeft < 0) {
      return {
        message: `This exam was due ${Math.abs(daysLeft)} day${
          Math.abs(daysLeft) !== 1 ? "s" : ""
        } ago. Don't give up! Complete the remaining topics.`,
        type: "danger",
      };
    }

    // Exam is due today
    if (daysLeft === 0) {
      return {
        message: "Exam is today! Focus on completing key topics.",
        type: "danger",
      };
    }

    // Calculate expected progress based on time remaining
    const totalDays = 30; // Assuming a typical study period of 30 days
    const daysElapsed = totalDays - daysLeft;
    const expectedProgress = Math.min(
      100,
      Math.max(0, (daysElapsed / totalDays) * 100)
    );

    // Behind schedule
    if (progress < expectedProgress - 10) {
      return {
        message: `You're behind schedule. Try to cover at least ${(
          (100 - progress) /
          daysLeft
        ).toFixed(2)}% each day.`,
        type: "warning",
      };
    }

    // Ahead of schedule
    if (progress > expectedProgress + 10) {
      return {
        message: `Excellent work! You're ahead of schedule by ${(
          progress - expectedProgress
        ).toFixed(2)}%.`,
        type: "success",
      };
    }

    // On track
    return {
      message: "You're on track with your study plan. Keep up the good work!",
      type: "info",
    };
  };

  // Format status tag based on days remaining
  const getStatusTag = (daysLeft: number, progress: number) => {
    if (progress >= 100)
      return { text: "Completed", className: "bg-green-100 text-green-800" };
    if (daysLeft < 0)
      return { text: "Overdue", className: "bg-red-100 text-red-800" };
    if (daysLeft === 0)
      return { text: "Today!", className: "bg-red-100 text-red-800" };
    if (daysLeft === 1)
      return { text: "Tomorrow", className: "bg-orange-100 text-orange-800" };
    if (daysLeft <= 7)
      return {
        text: `${daysLeft} days left`,
        className: "bg-orange-100 text-orange-800",
      };
    return {
      text: `${daysLeft} days left`,
      className: "bg-blue-100 text-blue-800",
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Time Management</h1>
          <p className="text-muted-foreground">
            Track and optimize your study time across all exams.
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/exams">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Time Management</h1>
        <p className="text-muted-foreground">
          Track and optimize your study time across all exams.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/exams">View all</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground pt-1">
            Active exams you need to prepare for.
          </p>
        </CardHeader>
        <CardContent>
          {exams && exams.length > 0 ? (
            <div ref={parentRef} className="h-[600px] overflow-auto">
              <div
                style={{
                  height: `${examVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {examVirtualizer.getVirtualItems().map((virtualRow) => {
                  const exam = exams[virtualRow.index];
                  const examDate = new Date(exam.examDate);
                  const today = new Date();
                  const daysLeft = differenceInCalendarDays(examDate, today);
                  const progress = Math.round((exam.progress || 0) * 100) / 100; // Round to 2 decimal places
                  const status = getStatusTag(daysLeft, progress);
                  const statusMessage = getExamStatusMessage(exam);

                  return (
                    <div
                      key={exam._id}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div className="border rounded-lg p-4 mb-4 bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-lg">
                              {exam.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {format(examDate, "MMMM d, yyyy")}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium",
                              status.className
                            )}
                          >
                            {status.text}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">
                              {progress.toFixed(2)}%
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div
                          className={cn(
                            "mt-3 p-2 rounded-md text-sm flex items-start gap-2",
                            statusMessage.type === "success"
                              ? "bg-green-50 text-green-700"
                              : statusMessage.type === "warning"
                              ? "bg-amber-50 text-amber-700"
                              : statusMessage.type === "danger"
                              ? "bg-red-50 text-red-700"
                              : "bg-blue-50 text-blue-700"
                          )}
                        >
                          <AlertCircle className="h-4 w-4 mt-0.5" />
                          <p>{statusMessage.message}</p>
                        </div>

                        <div className="flex justify-end mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            asChild
                          >
                            <Link to={`/exams/${exam._id}`}>
                              View Topics{" "}
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <Clock className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Exams Found</h3>
              <p className="text-muted-foreground mt-1">
                Add your first exam to start tracking your study time.
              </p>
              <Button asChild className="mt-4">
                <Link to="/exams">Add New Exam</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
