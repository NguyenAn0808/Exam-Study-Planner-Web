// src/pages/SchedulePage.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Schedule</h1>
        <p className="text-muted-foreground">
          Plan and visualize your study sessions on a calendar.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-64">
          <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            A full calendar view for scheduling is coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
