import { NavLink } from "react-router-dom";
import { Home, BookOpen, Calendar, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "My Exams",
    href: "/exams",
    icon: BookOpen,
  },
  {
    title: "Study Planner",
    href: "/planner",
    icon: Calendar,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: PieChart,
  },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r bg-card min-h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-4 p-6">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
