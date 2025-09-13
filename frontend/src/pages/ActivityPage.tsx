import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";
import { useActivities } from "@/hooks/useActivities";
import { ActivityItem } from "@/components/activity/ActivityItem";

export default function ActivityPage() {
  const { data: activities, isLoading, isError } = useActivities();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="text-center text-destructive">
          Failed to load activity feed.
        </p>
      );
    }

    if (!activities || activities.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-64">
          <Activity className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Recent Activity</h3>
          <p className="text-muted-foreground mt-1">
            Your recent actions will appear here.
          </p>
        </div>
      );
    }

    return (
      <div className="divide-y">
        {activities.map((activity) => (
          <ActivityItem key={activity._id} activity={activity} />
        ))}
      </div>
    );
  };

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
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
