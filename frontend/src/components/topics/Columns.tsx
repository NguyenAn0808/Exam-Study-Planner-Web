"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { ITopic } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ITopic>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={cn({
            "bg-primary text-primary-foreground": status === "Completed",
            "bg-blue-100 text-blue-800 border border-blue-300":
              status === "In-progress",
            "bg-secondary text-secondary-foreground": status === "Not Started",
          })}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Topic Name",
  },
  {
    accessorKey: "exam.title",
    header: "Exam",
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      return <div>{format(new Date(row.getValue("createdAt")), "P")}</div>;
    },
  },
];
