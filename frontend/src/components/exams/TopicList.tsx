import { TopicCard } from "./TopicCard";
import type { ITopic } from "@/types";

interface TopicListProps {
  topics: ITopic[];
  onLogTimeClick: (topic: ITopic) => void;
}

export const TopicList = ({ topics, onLogTimeClick }: TopicListProps) => {
  // ...
  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <TopicCard
          key={topic._id}
          topic={topic}
          index={index}
          onLogTimeClick={onLogTimeClick}
        />
      ))}
    </div>
  );
};
