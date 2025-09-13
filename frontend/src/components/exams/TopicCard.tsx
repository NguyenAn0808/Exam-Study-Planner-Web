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
import { Input } from "../ui/input";

interface TopicItemProps {
  topic: ITopic;
  index: number;
}

export const TopicCard: React.FC<TopicItemProps> = React.memo(
  ({ topic, index }) => {
    const { updateTopic, deleteTopic, isUpdating, isDeleting } = useTopics(
      topic.exam
    );

    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(topic.name);

    const handleToggleStatus = () => {
      let nextStatus: TopicStatus;
      switch (topic.status) {
        case "Not Started":
          nextStatus = "In-progress";
          break;
        case "In-progress":
          nextStatus = "Completed";
          break;
        case "Completed":
          nextStatus = "Not Started";
          break;
        default:
          nextStatus = "Not Started";
      }
      updateTopic({ topicID: topic._id, status: nextStatus });
    };

    const handleUpdateName = () => {
      if (updatedName.trim() && updatedName.trim() !== topic.name) {
        updateTopic({ topicID: topic._id, name: updatedName.trim() });
      }
      setIsEditing(false);
    };

    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete "${topic.name}"?`)) {
        deleteTopic(topic._id);
      }
    };

    const isOperationPending = isUpdating || isDeleting;

    return (
      <Card
        className={cn(
          "p-4 bg-white border-2 border-transparent shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in group",
          topic.status === "Completed" && "opacity-60 bg-slate-50",
          topic.status === "In-progress" && "border-blue-400",
          isOperationPending && "opacity-50 pointer-events-none" // Dim and disable card during operations
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center gap-4">
          {/* Status Toggle Button (Left side) */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 rounded-full"
            onClick={handleToggleStatus}
            disabled={isOperationPending}
          >
            {topic.status === "Completed" ? (
              <CheckCircle2 className="size-5 text-green-500" />
            ) : topic.status === "In-progress" ? (
              <Circle className="size-5 text-blue-500 fill-blue-500/20 animate-pulse" />
            ) : (
              <Circle className="size-5 text-muted-foreground" />
            )}
          </Button>

          {/* Topic Name and Date (Middle part) */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                onBlur={handleUpdateName}
                onKeyPress={(e) => e.key === "Enter" && handleUpdateName()}
                autoFocus
                disabled={isOperationPending}
              />
            ) : (
              <div>
                <p
                  className={cn(
                    "text-base font-medium",
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
            )}
          </div>

          {/* Action Items Container (Right side) */}
          <div className="flex items-center gap-2 min-w-max">
            {/* "In Progress" Status Text */}
            {topic.status === "In-progress" && (
              <div className="hidden text-sm font-semibold text-blue-500 sm:block animate-pulse">
                In Progress
              </div>
            )}

            {/* Edit and Delete Buttons (Appear on Hover) */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => setIsEditing(true)}
                disabled={isOperationPending || isEditing}
              >
                <SquarePen className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={handleDelete}
                disabled={isOperationPending}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
