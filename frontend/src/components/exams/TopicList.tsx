import { TopicCard } from "@/components/exams/TopicCard";
import type { ITopic } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface TopicListProps {
  topics: ITopic[];
  onLogTimeClick: (topic: ITopic) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  onLogTimeClick,
}) => {
  // Create a reference to the parent container
  const parentRef = useRef<HTMLDivElement>(null);

  // Set up the virtualizer
  const rowVirtualizer = useVirtualizer({
    count: topics.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated height of each topic card
    overscan: 5, // Number of items to render before/after the visible area
  });

  return (
    <div className="mt-6">
      {topics.length > 0 ? (
        <div ref={parentRef} className="h-[400px] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const topic = topics[virtualItem.index];
              return (
                <div
                  key={topic._id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <TopicCard 
                    topic={topic} 
                    index={virtualItem.index} 
                    onLogTimeClick={onLogTimeClick} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          No topics to display.
        </div>
      )}
    </div>
  );
};
