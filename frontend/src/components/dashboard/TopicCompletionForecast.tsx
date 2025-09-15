import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExams } from "@/hooks/useExams";
import { addDays, format, differenceInCalendarDays } from "date-fns";
import { useMemo } from "react";

export const TopicCompletionForecast = () => {
  const { exams, isLoading } = useExams();

  const forecastData = useMemo(() => {
    if (!exams || isLoading) return [];

    // Get active exams
    const activeExams = exams.filter((exam) => exam.progress < 100);
    if (activeExams.length === 0) return [];

    // Calculate current completion stats
    const totalTopics = activeExams.reduce(
      (sum, exam) => sum + exam.totalTopics,
      0
    );
    const completedTopics = activeExams.reduce(
      (sum, exam) => sum + exam.completedTopics,
      0
    );

    // Estimate completion rate per day
    const today = new Date();
    // Assume a consistent rate of topics per day based on past performance
    // If no history, assume 2 topics per day
    const topicsPerDay = completedTopics > 0 ? completedTopics / 14 : 2;

    // Generate forecast for next 14 days
    const forecast = [];
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      const projectedCompleted = Math.min(
        totalTopics,
        completedTopics + topicsPerDay * i
      );
      const projectedPercentage =
        totalTopics > 0
          ? Math.round((projectedCompleted / totalTopics) * 100)
          : 0;

      forecast.push({
        day: format(date, "MMM d"),
        completed: projectedPercentage,
      });
    }

    return forecast;
  }, [exams, isLoading]);

  if (isLoading || !forecastData.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion Forecast</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={forecastData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis
              domain={[0, 100]}
              label={{ value: "%", position: "insideLeft" }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Completion"]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
