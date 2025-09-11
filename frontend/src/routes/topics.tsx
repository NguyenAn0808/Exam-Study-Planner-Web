import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Check, Plus } from "lucide-react";

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Study Topics</h1>
          <p className="text-muted-foreground">Manage and track your study topics</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Topic
        </Button>
      </div>

      {/* Subject Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Mathematics</CardTitle>
              <span className="text-sm text-muted-foreground">8/10 completed</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">Integration</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Differential Equations</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Continue</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Physics</CardTitle>
              <span className="text-sm text-muted-foreground">7/10 completed</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">Mechanics</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Review</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Quantum Physics</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Continue</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Topic Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Overall Completion</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Topics</p>
                <p className="text-2xl font-bold">20</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
