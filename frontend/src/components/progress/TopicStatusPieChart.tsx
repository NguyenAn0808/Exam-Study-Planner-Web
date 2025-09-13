"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { IExamWithStats } from "@/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils"; // Import cn just in case

interface TopicsStatusPieChartProps {
  data: IExamWithStats[];
}

interface PieLabelRenderProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const COLORS = {
  Completed: "#22c55e", // Green-500
  "In-progress": "#3b82f6", // Blue-500
  "Not Started": "#a1a1aa", // True Gray-400
};

export const TopicsStatusPieChart: React.FC<TopicsStatusPieChartProps> = ({
  data,
}) => {
  const pieData = useMemo(() => {
    const totalCompleted = data.reduce(
      (sum, exam) => sum + exam.completedTopics,
      0
    );
    const totalInProgress = data.reduce(
      (sum, exam) => sum + exam.inProgressTopics,
      0
    );
    const totalTopicsAll = data.reduce(
      (sum, exam) => sum + exam.totalTopics,
      0
    );
    const totalNotStarted = totalTopicsAll - totalCompleted - totalInProgress;
    return [
      { name: "Completed", value: totalCompleted },
      { name: "In-progress", value: totalInProgress },
      { name: "Not Started", value: totalNotStarted },
    ].filter((item) => item.value > 0);
  }, [data]);

  if (pieData.every((item) => item.value === 0)) {
    return (
      <div className="text-center text-muted-foreground h-[300px] flex items-center justify-center">
        No topic data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={(props: any) => {
            const { cx, cy, midAngle, innerRadius, outerRadius, percent } =
              props;

            if (percent === undefined || percent === null) return null;

            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize="12px"
                fontWeight="bold"
              >
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }}
        >
          {pieData.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[entry.name as keyof typeof COLORS]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
