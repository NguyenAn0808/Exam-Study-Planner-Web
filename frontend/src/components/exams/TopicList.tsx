import { TopicItem } from "./TopicItem";
import type { ITopic } from "@/types";

interface TopicListProps {
  topics: ITopic[];
}

export const TopicList = ({ topics }: TopicListProps) => {
  if (topics.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No topics added yet. Start by adding your first topic above!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <TopicItem key={topic._id} topic={topic} index={index} />
      ))}
    </div>
  );
};
