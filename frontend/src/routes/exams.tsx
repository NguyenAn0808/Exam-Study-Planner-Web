import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExamsRoute() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Exams</h1>
          <p className="text-muted-foreground">
            Manage your upcoming exams and study progress
          </p>
        </div>
        <Button variant="default">Add New Exam</Button>
      </div>

      <div className="grid gap-4">
        {/* Example exam card - we'll make this dynamic later */}
      </div>
    </div>
  );
}
