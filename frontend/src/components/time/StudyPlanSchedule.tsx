import { generateStudyPlan } from "@/lib/timeUtils";
import { format, isPast, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Clock, Calendar as CalendarIcon } from "lucide-react";

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
  
  // Calculate progress statistics
  const completedTopics = topics.filter(t => t.isCompleted).length;
  const progressPercentage = topics.length > 0 
    ? Math.round((completedTopics / topics.length) * 100)
    : 0;
  
  return (
    <div className="space-y-6">
      {/* Header with overview stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold">AI Study Schedule</h3>
        </div>
        <Badge variant="outline" className="font-medium">
          {progressPercentage}% Complete
        </Badge>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Days remaining info */}
      <div className="flex justify-between text-sm">
        <div>
          <span className="font-medium">Start Date:</span> {format(new Date(startDate), "MMM d, yyyy")}
        </div>
        <div>
          <span className="font-medium">Exam Date:</span> {format(new Date(endDate), "MMM d, yyyy")}
        </div>
      </div>
      
      {studyPlan.length === 0 ? (
        <div className="text-center py-8 border rounded-md">
          <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">
            No study plan available. Please check your start and end dates.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {studyPlan.map((day, index) => {
            const isPastDay = isPast(day.date) && !isToday(day.date);
            const isCurrentDay = isToday(day.date);
            
            // Count completed topics for this day
            const dayTopics = day.topicIndices.map(idx => topics[idx]).filter(Boolean);
            const completedDayTopics = dayTopics.filter(t => t.isCompleted).length;
            const dayProgressPercentage = dayTopics.length > 0
              ? Math.round((completedDayTopics / dayTopics.length) * 100)
              : 0;
              
            return (
              <div 
                key={index} 
                className={`border rounded-md overflow-hidden ${
                  isCurrentDay 
                    ? 'border-purple-200 shadow-md bg-purple-50' 
                    : isPastDay 
                      ? 'opacity-75' 
                      : ''
                }`}
              >
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {format(day.date, "EEEE, MMM d, yyyy")}
                    {isCurrentDay && (
                      <Badge className="ml-2 bg-purple-600">Today</Badge>
                    )}
                  </div>
                  <Badge variant="outline">
                    {dayTopics.length} topic{dayTopics.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                
                {/* Progress bar for this day */}
                <div className="w-full bg-gray-100 h-1">
                  <div 
                    className="bg-purple-500 h-1 transition-all duration-500"
                    style={{ width: `${dayProgressPercentage}%` }}
                  />
                </div>
                
                <div className="p-3">
                  <ul className="space-y-2">
                    {day.topicIndices.map((topicIndex) => {
                      const topic = topics[topicIndex];
                      if (!topic) return null;
                      
                      return (
                        <li key={topic.id} className="flex items-center justify-between gap-2 p-1 hover:bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {topic.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className={topic.isCompleted ? 'text-muted-foreground line-through' : ''}>
                              {topic.title}
                            </span>
                          </div>
                          
                          {topic.isCompleted && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}