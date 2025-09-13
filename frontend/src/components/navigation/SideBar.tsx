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

// Define the shape of the stats prop
interface SidebarStats {
  examCount: number | null;
  topicsCompleted: number | null;
  totalTopics: number | null;
  overallProgress: number | null;
}

interface SidebarProps {
  stats: SidebarStats;
}

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/exams", label: "My Exams", statKey: "examCount" },
  { href: "/hours", label: "Study Hours", statKey: "studyHours" },
  { href: "/topics", label: "Topics", statKey: "topicsProgress" },
  { href: "/schedule", label: "Schedule", statKey: "scheduleCount" },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/progress", label: "Progress", statKey: "overallProgress" },
];

export const Sidebar = ({ stats }: SidebarProps) => {
  const getStatDisplay = (key?: string) => {
    if (!key || stats.examCount === null) {
      // Use examCount as a loading indicator
      return <Skeleton className="h-4 w-8" />;
    }

    switch (key) {
      case "examCount":
        return stats.examCount;
      case "topicsProgress":
        return `${stats.topicsCompleted}/${stats.totalTopics}`;
      case "overallProgress":
        return `${stats.overallProgress}%`;
      // Placeholder for future features
      case "scheduleCount":
        return 2; // Placeholder
      default:
        return null;
    }
  };

  // A mapping of icons to components. Add more as needed.
  const iconMap: { [key: string]: React.ElementType } = {
    "My Exams": BookCopy,
    "Study Hours": Clock,
    Topics: CheckCircle,
    Schedule: Calendar,
    Progress: TrendingUp,
  };

  return (
    <aside className="w-64 border-r bg-background p-4 hidden md:block">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon || iconMap[item.label];
          return (
            <NavLink
              key={item.label}
              to={item.href}
              end // 'end' prop for Dashboard to not match other routes
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary"
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.statKey && (
                <Badge
                  variant={item.label === "Progress" ? "default" : "secondary"}
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
