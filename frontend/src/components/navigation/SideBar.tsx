import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Clock,
  Target,
  Calendar,
  Activity,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    badge: "",
  },
  {
    title: "My Exams",
    href: "/exams",
    icon: BookOpen,
    badge: "4",
  },
  {
    title: "Study Hours",
    href: "/hours",
    icon: Clock,
    badge: "",
  },
  {
    title: "Topics",
    href: "/topics",
    icon: Target,
    badge: "15/20",
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
    badge: "2",
  },
  {
    title: "Activity",
    href: "/activity",
    icon: Activity,
    badge: "",
  },
  {
    title: "Progress",
    href: "/progress",
    icon: LineChart,
    badge: "85%",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-1 p-6">
        {navItems.map((item) => {
          const isActive = isRootPath
            ? item.href === "/"
            : location.pathname === item.href ||
              location.pathname.startsWith(`${item.href}/`);

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200 ease-in-out",
                  "hover:bg-accent/50 dark:hover:bg-accent/20",
                  isActive && [
                    "bg-accent dark:bg-accent/30",
                    "text-accent-foreground dark:text-accent-foreground/90",
                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                    "before:h-6 before:w-1 before:rounded-r-md before:bg-primary",
                  ],
                  !isActive && [
                    "text-muted-foreground",
                    "hover:text-accent-foreground dark:hover:text-accent-foreground/90",
                  ]
                )
              }
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isActive && "text-primary"
                )}
              />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span
                  className={cn(
                    "text-xs rounded-full px-2 py-0.5 transition-colors",
                    isActive
                      ? "bg-primary/20 text-primary dark:bg-primary/30"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
