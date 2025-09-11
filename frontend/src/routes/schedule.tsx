import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function ScheduleRoute() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Schedule</h1>
          <p className="text-muted-foreground">Plan and manage your study sessions</p>
        </div>
        <Button variant="default">
          <Calendar className="mr-2 h-5 w-5" />
          Plan New Session
        </Button>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>This Week's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-accent rounded-lg">
                <div>
                  <p className="text-sm font-medium">Math Review</p>
                  <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                </div>
                <Button variant="ghost" size="sm">Join</Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Physics Lab</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
                <Button variant="ghost" size="sm">Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
