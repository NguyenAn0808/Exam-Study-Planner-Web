// src/pages/TopicsPage.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Topics</h1>
        <p className="text-muted-foreground">
          A centralized view of all your topics across every exam.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-64">
          <CheckCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            A global topic management page is coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
