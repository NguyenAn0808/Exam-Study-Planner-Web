import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActivityRoute() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity History</h1>
        <p className="text-muted-foreground">Track your study progress and achievements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example activities - we'll make this dynamic later */}
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Completed "Integration" topic</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Added new study session</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
