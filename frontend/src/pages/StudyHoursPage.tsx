// src/pages/StudyHoursPage.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function StudyHoursPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Hours</h1>
        <p className="text-muted-foreground">
          Track your study time and manage your schedule.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-64">
          <Clock className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            The ability to track study hours is coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
