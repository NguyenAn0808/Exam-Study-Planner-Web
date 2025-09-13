import type { IActivity } from "@/types";
import { formatRelative } from "date-fns";
import {
  FilePlus,
  Trash2,
  ListPlus,
  ListX,
  CheckCircle,
  CircleDot,
} from "lucide-react";
import React from "react";

const activityConfig = {
  CREATED_EXAM: {
    icon: FilePlus,
    text: "You created a new exam:",
    color: "text-blue-500",
  },
  DELETED_EXAM: {
    icon: Trash2,
    text: "You deleted an exam:",
    color: "text-red-500",
  },
  CREATED_TOPIC: {
    icon: ListPlus,
    text: "You added a new topic:",
    color: "text-green-500",
  },
  DELETED_TOPIC: {
    icon: ListX,
    text: "You deleted a topic:",
    color: "text-red-500",
  },
  COMPLETED_TOPIC: {
    icon: CheckCircle,
    text: "You completed a topic:",
    color: "text-purple-500",
  },
  UNCOMPLETED_TOPIC: {
    icon: CircleDot,
    text: "You marked a topic as not completed:",
    color: "text-yellow-500",
  },
};

interface ActivityItemProps {
  activity: IActivity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const config = activityConfig[activity.action];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex items-start gap-4 p-4 border-b">
      <div className={`mt-1 ${config.color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground">
          {config.text}{" "}
          <span className="font-semibold">"{activity.details}"</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatRelative(new Date(activity.createdAt), new Date())}
        </p>
      </div>
    </div>
  );
};
