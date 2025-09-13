import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllTopics } from "@/hooks/useAllTopics"; // Hook mới
import { DataTable } from "@/components/topics/DataTable"; // Component mới
import { columns } from "@/components/topics/Columns"; // Component mới

export default function TopicsPage() {
  const { data: topics, isLoading, isError } = useAllTopics();

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
          <CardTitle>Topic Management</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : isError ? (
            <p className="text-destructive">Failed to load topics.</p>
          ) : (
            <DataTable columns={columns} data={topics || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
