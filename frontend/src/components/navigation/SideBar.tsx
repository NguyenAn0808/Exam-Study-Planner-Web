// src/components/navigation/Sidebar.tsx

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookCopy,
  Clock,
  CheckCircle,
  Calendar,
  Activity,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Define the shape of the stats prop for TypeScript
interface SidebarStats {
  examCount: number | null;
  topicsCompleted: number | null;
  totalTopics: number | null;
  overallProgress: number | null;
}

interface SidebarProps {
  stats: SidebarStats;
}

// Define navigation items in an array for easy mapping
const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/exams", label: "My Exams", icon: BookCopy, statKey: "examCount" },
  { href: "/hours", label: "Study Hours", icon: Clock },
  {
    href: "/topics",
    label: "Topics",
    icon: CheckCircle,
    statKey: "topicsProgress",
  },
  {
    href: "/schedule",
    label: "Schedule",
    icon: Calendar,
    statKey: "scheduleCount",
  },
  { href: "/activity", label: "Activity", icon: Activity },
  {
    href: "/progress",
    label: "Progress",
    icon: TrendingUp,
    statKey: "overallProgress",
  },
];

export const Sidebar = ({ stats }: SidebarProps) => {
  // Helper function to render the correct stat or a skeleton loader
  const getStatDisplay = (key?: string) => {
    // If stats haven't loaded yet, show a skeleton
    if (stats.examCount === null) {
      return <Skeleton className="h-4 w-10" />;
    }

    // Otherwise, show the correct stat based on the key
    switch (key) {
      case "examCount":
        return stats.examCount;
      case "topicsProgress":
        return `${stats.topicsCompleted ?? 0}/${stats.totalTopics ?? 0}`;
      case "overallProgress":
        return `${stats.overallProgress ?? 0}%`;
      // Placeholder for a future feature
      case "scheduleCount":
        return 2; // Example placeholder
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 border-r bg-background p-4 hidden md:block shrink-0">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              // The 'end' prop ensures the Dashboard link isn't active for other routes
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary",
                  isActive && "bg-muted text-primary font-semibold"
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.statKey && (
                <Badge
                  variant={item.label === "Progress" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {getStatDisplay(item.statKey)}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
