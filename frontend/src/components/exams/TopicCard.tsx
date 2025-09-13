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
  BrainCircuit,
  Clock,
} from "lucide-react";
import { useTopics } from "@/hooks/useTopics";
import { format } from "date-fns";
import type { ITopic, TopicStatus } from "@/types";
import { Input } from "../ui/input";
import { useAI } from "@/contexts/AIContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Props interface defines what the component expects to receive
interface TopicItemProps {
  topic: ITopic;
  index: number;
  onLogTimeClick: (topic: ITopic) => void;
}

export const TopicCard: React.FC<TopicItemProps> = React.memo(
  ({ topic, index, onLogTimeClick }) => {
    // Hooks for data and state management
    const { updateTopic, deleteTopic, isUpdating, isDeleting } = useTopics(
      topic.exam
    );
    const { openQuestionModal } = useAI();

    // Local state for UI interactions
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(topic.name);

    // Derived boolean for clearer logic in JSX
    const canGenerateQuestions = topic.status === "In-progress";
    const isOperationPending = isUpdating || isDeleting;

    // --- Event Handlers ---
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
        deleteTopic(topic._id); // Check your useTopics hook if this expects an object {topicID: ...}
      }
    };

    return (
      <TooltipProvider>
        <Card
          className={cn(
            "p-4 bg-white border-2 border-transparent shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in group",
            topic.status === "Completed" && "opacity-60 bg-slate-50",
            topic.status === "In-progress" && "border-blue-400",
            isOperationPending && "opacity-50 pointer-events-none"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-4">
            {/* Status Toggle Button */}
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

            {/* Topic Name (Display or Edit Input) */}
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
              {topic.status === "In-progress" && (
                <div className="hidden text-sm font-semibold text-blue-500 sm:block animate-pulse">
                  In Progress
                </div>
              )}

              {/* Action Buttons (Appear on Hover) */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => onLogTimeClick(topic)}
                    >
                      <Clock className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Log study time for this topic</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-blue-100 hover:text-blue-600"
                        onClick={() =>
                          canGenerateQuestions && openQuestionModal(topic.name)
                        }
                        disabled={!canGenerateQuestions || isOperationPending}
                      >
                        <BrainCircuit className="size-4" />
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {canGenerateQuestions
                        ? "Generate AI practice questions"
                        : "Topic must be 'In-progress' to generate questions."}
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => setIsEditing(true)}
                      disabled={isOperationPending || isEditing}
                    >
                      <SquarePen className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit topic name</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleDelete}
                      disabled={isOperationPending}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete topic</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>
      </TooltipProvider>
    );
  }
);
