// src/pages/ActivityPage.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <p className="text-muted-foreground">
          A timeline of all your recent activities and achievements.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-64">
          <Activity className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            A feed of your recent study activity is coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
