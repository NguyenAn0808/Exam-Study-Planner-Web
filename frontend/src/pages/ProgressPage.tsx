import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Details</h1>
        <p className="text-muted-foreground">
          Detailed charts and analytics of your study progress.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Under Development</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center h-64">
          <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Detailed progress tracking is coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
