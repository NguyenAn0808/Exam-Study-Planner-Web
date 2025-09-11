import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Sidebar } from "../components/navigation/Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
