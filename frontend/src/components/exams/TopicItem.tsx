// src/components/exams/TopicItem.tsx

import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { useTopics } from "@/hooks/useTopics";
import { format } from "date-fns";
import type { ITopic, TopicStatus } from "@/types";

interface TopicItemProps {
  topic: ITopic;
  index: number;
}

export const TopicItem: React.FC<TopicItemProps> = ({ topic, index }) => {
  const { updateStatus } = useTopics(topic.exam);

  const handleToggleStatus = () => {
    let nextStatus: TopicStatus = "In Progress";
    if (topic.status === "Not Started") nextStatus = "In Progress";
    if (topic.status === "In Progress") nextStatus = "Completed";
    if (topic.status === "Completed") nextStatus = "Not Started";

    updateStatus({ topicID: topic._id, status: nextStatus });
  };

  return (
    <Card
      className={cn(
        "p-4 bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in group",
        topic.status === "Completed" && "opacity-60"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 size-8 rounded-full"
          onClick={handleToggleStatus}
        >
          {topic.status === "Completed" ? (
            <CheckCircle2 className="size-5 text-green-500" />
          ) : (
            <Circle className="size-5 text-muted-foreground" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-base",
              topic.status === "Completed" &&
                "line-through text-muted-foreground"
            )}
          >
            {topic.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Added on {format(new Date(topic.createdAt), "P")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
