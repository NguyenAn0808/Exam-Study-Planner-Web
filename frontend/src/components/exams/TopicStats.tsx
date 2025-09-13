import { Badge } from "@/components/ui/badge";

interface TopicStatsProps {
  counts: {
    "Not Started": number;
    "In-progress": number;
    Completed: number;
  };
}

export const TopicStats: React.FC<TopicStatsProps> = ({ counts }) => {
  return (
    <div className="flex gap-2 flex-wrap border-b pb-4 mb-4">
      <Badge variant="secondary">
        Not Started: {counts["Not Started"] || 0}
      </Badge>
      <Badge className="border-blue-300 text-blue-800 bg-blue-100">
        In Progress: {counts["In-progress"] || 0}
      </Badge>
      <Badge className="border-green-300 text-green-800 bg-green-100">
        Completed: {counts.Completed || 0}
      </Badge>
    </div>
  );
};
