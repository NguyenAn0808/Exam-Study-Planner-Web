import { generateStudyPlan } from "@/lib/timeUtils";
import { format } from "date-fns";

type StudyPlanProps = {
  topicsCount: number;
  startDate: Date | string;
  endDate: Date | string;
  topics: Array<{ id: string; title: string; isCompleted: boolean }>;
}

/**
 * Component to display a recommended study plan based on topics and deadline
 */
export function StudyPlanSchedule({ topicsCount, startDate, endDate, topics }: StudyPlanProps) {
  const studyPlan = generateStudyPlan(topicsCount, startDate, endDate);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recommended Study Plan</h3>
      
      {studyPlan.length === 0 ? (
        <p className="text-muted-foreground">
          No study plan available. Please check your start and end dates.
        </p>
      ) : (
        <div className="space-y-3">
          {studyPlan.map((day, index) => (
            <div key={index} className="border rounded-md p-3">
              <div className="font-medium mb-1">{format(day.date, "EEEE, MMM d, yyyy")}</div>
              <ul className="space-y-1 text-sm">
                {day.topicIndices.map((topicIndex) => {
                  const topic = topics[topicIndex];
                  if (!topic) return null;
                  
                  return (
                    <li key={topic.id} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${topic.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={topic.isCompleted ? 'line-through text-muted-foreground' : ''}>
                        {topic.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}