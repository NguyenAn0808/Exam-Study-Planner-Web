import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActivityRoute() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity History</h1>
        <p className="text-muted-foreground">
          Track your study progress and achievements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example activities - we'll make this dynamic later */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
