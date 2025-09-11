import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function RootRoute() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
