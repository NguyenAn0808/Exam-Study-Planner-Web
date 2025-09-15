import { Skeleton } from "@/components/ui/skeleton";
import { useExams } from "@/hooks/useExams";
import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventInput } from "@fullcalendar/core";
import { useNavigate } from "react-router-dom";

import "../styles/fullcalender.css";

export default function SchedulePage() {
  const { exams, isLoading, isError } = useExams();
  const navigate = useNavigate();

  // Convert the exam data into the format FullCalendar expects
  const calendarEvents: EventInput[] = useMemo(() => {
    if (!exams) return [];

    return exams.map((exam) => ({
      id: exam._id,
      title: exam.title,
      date: exam.examDate,
      allDay: true,
      backgroundColor:
        exam.progress >= 100
          ? "hsl(var(--success))"
          : "hsl(var(--destructive))",
      borderColor:
        exam.progress >= 100
          ? "hsl(var(--success))"
          : "hsl(var(--destructive))",
      textColor: "hsl(var(--success-foreground))", // Assuming white/light text for both
      extendedProps: {
        progress: exam.progress,
      },
    }));
  }, [exams]);

  const handleEventClick = (clickInfo: any) => {
    navigate(`/exams/${clickInfo.event.id}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-[600px] w-full rounded-lg" />;
    }

    if (isError) {
      return (
        <p className="text-center text-destructive py-16">
          Failed to load schedule. Please try again.
        </p>
      );
    }

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          height="auto" // Let the container control the height
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
          }}
          dayHeaderFormat={{ weekday: "short" }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exam Schedule</h1>
        <p className="text-muted-foreground">
          A calendar view of all your exam deadlines. Click an event to view
          details.
        </p>
      </div>

      {renderContent()}
    </div>
  );
}
