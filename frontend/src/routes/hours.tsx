import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function StudyHoursPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Hours</h1>
          <p className="text-muted-foreground">Track your study time and manage your schedule</p>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Monday</p>
                    <p className="text-sm text-muted-foreground">Mathematics, Physics</p>
                  </div>
                </div>
                <p className="font-medium">4.5h</p>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tuesday</p>
                    <p className="text-sm text-muted-foreground">Chemistry, Biology</p>
                  </div>
                </div>
                <p className="font-medium">3.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Hours:</span>
                <span className="font-medium">86.5h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Daily Average:</span>
                <span className="font-medium">2.8h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Most Productive Day:</span>
                <span className="font-medium">Monday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Study Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Mathematics</h3>
                <p className="text-sm text-muted-foreground">Integration and Derivatives</p>
              </div>
              <div className="text-right">
                <p className="font-medium">2.5h</p>
                <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Physics</h3>
                <p className="text-sm text-muted-foreground">Quantum Mechanics</p>
              </div>
              <div className="text-right">
                <p className="font-medium">1.5h</p>
                <p className="text-sm text-muted-foreground">Today, 10:00 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
