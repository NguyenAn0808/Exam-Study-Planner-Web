import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  Calendar,
  ActivityIcon,
  TrendingUp,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface SidebarStatsProps {
  examCount: number | null;
  topicsCompleted: number | null;
  totalTopics: number | null;
  overallProgress: number | null;
}

interface MobileNavProps {
  stats: SidebarStatsProps;
}

export const MobileNav = ({ stats }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
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
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="p-6">
          <div className="flex flex-col h-full">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
