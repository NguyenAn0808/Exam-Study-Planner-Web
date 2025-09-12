import React, { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useTopics } from "@/hooks/useTopics";
import { format } from "date-fns";
import type { ITopic, TopicStatus } from "@/types";

interface TopicItemProps {
  topic: ITopic;
  index: number;
}

export const TopicCard: React.FC<TopicItemProps> = React.memo(
  ({ topic, index }) => {
    const { updateStatus, updateTopicName, deleteTopic } = useTopics(
      topic.exam
    );

    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(topic.name);

    const handleToggleStatus = () => {
      let nextStatus: TopicStatus = "In Progress";
      if (topic.status === "Not Started") nextStatus = "In Progress";
      if (topic.status === "In Progress") nextStatus = "Completed";
      if (topic.status === "Completed") nextStatus = "Not Started";

      updateStatus({ topicID: topic._id, status: nextStatus });
    };

    const handleUpdateName = () => {
      if (updatedName.trim() && updatedName.trim() !== topic.name) {
        updateTopicName({ topicID: topic._id, name: updatedName.trim() });
      }
      setIsEditing(false);
    };

    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete "${topic.name}"?`)) {
        deleteTopic(topic._id);
      }
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

          {/* Edit name */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                onBlur={handleUpdateName}
                onKeyPress={(e) => e.key === "Enter" && handleUpdateName()}
                autoFocus
              />
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Edit and Delete */}
          <div className="hidden gap-1 group-hover:flex animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
);
