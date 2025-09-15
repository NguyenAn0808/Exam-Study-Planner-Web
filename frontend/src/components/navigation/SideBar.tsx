import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookCopy,
  BookOpen,
  Clock,
  ListChecks,
  Target,
  Activity as ActivityIcon,
  CheckCircle,
  Calendar,
  Activity,
  TrendingUp,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "react-router-dom";

// Define the shape of the stats prop for TypeScript
interface SidebarStats {
  examCount: number | null;
  topicsCompleted: number | null;
  totalTopics: number | null;
  overallProgress: number | null;
}

interface SidebarProps {
  stats?: SidebarStats;
}

export const Sidebar = ({
  stats = {
    examCount: null,
    topicsCompleted: null,
    totalTopics: null,
    overallProgress: null,
  },
}: SidebarProps) => {
  const { pathname } = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      badge: null,
      active: pathname === "/",
    },
    {
      title: "AI Study Planner",
      href: "/study-planner",
      icon: Target,
      badge: "New",
      active: pathname === "/study-planner",
    },
    {
      title: "My Exams",
      href: "/exams",
      icon: BookOpen,
      badge: stats.examCount,
      active: pathname.startsWith("/exam"),
    },
    {
      title: "Topics",
      href: "/topics",
      icon: ListChecks,
      badge: stats.totalTopics
        ? `${stats.topicsCompleted}/${stats.totalTopics}`
        : null,
      active: pathname === "/topics",
    },
    {
      title: "Schedule",
      href: "/schedule",
      icon: Calendar,
      badge: null,
      active: pathname === "/schedule",
    },
    {
      title: "Activity",
      href: "/activity",
      icon: ActivityIcon,
      badge: null,
      active: pathname === "/activity",
    },
    {
      title: "Progress",
      href: "/progress",
      icon: TrendingUp,
      badge: stats.overallProgress ? `${stats.overallProgress}%` : null,
      active: pathname === "/progress",
    },
    {
      title: "Time Management",
      href: "/time",
      icon: Clock,
      badge: null,
      active: pathname === "/time",
    },
  ];

  return (
    <aside className="hidden lg:block w-64 border-r bg-gray-50 p-6">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive || item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge !== null && (
                <span className="ml-auto bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};
