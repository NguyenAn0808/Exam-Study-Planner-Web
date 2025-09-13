// src/components/exams/TopicFilters.tsx
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface TopicFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const filterOptions = {
  all: "All",
  "Not Started": "Not Started",
  "In-progress": "In Progress",
  Completed: "Completed",
};

export const TopicFilters: React.FC<TopicFiltersProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="flex gap-2">
      {Object.keys(filterOptions).map((key) => (
        <Button
          key={key}
          variant={filter === key ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter(key)}
        >
          <Filter className="mr-2 h-4 w-4" />
          {filterOptions[key as keyof typeof filterOptions]}
        </Button>
      ))}
    </div>
  );
};
