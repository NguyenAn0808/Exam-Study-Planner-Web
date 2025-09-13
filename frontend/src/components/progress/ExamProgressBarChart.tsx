"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { IExamWithStats } from "@/types";

interface ExamsProgressBarChartProps {
  data: IExamWithStats[];
}

export const ExamsProgressBarChart: React.FC<ExamsProgressBarChartProps> = ({
  data,
}) => {
  const chartData = data.map((exam) => ({
    name: exam.title,
    progress: Math.round(exam.progress || 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis unit="%" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Legend />
        <Bar
          dataKey="progress"
          fill="hsl(var(--primary))"
          name="Progress (%)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
