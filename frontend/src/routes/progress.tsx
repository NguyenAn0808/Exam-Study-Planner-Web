import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressRoute() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Study Progress</h1>
        <p className="text-muted-foreground">Track your progress across all subjects</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mathematics Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Overall Progress</p>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full w-3/4" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Topics Completed: 15/20</p>
                <p className="text-sm text-muted-foreground">Next topic: Differential Equations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Physics Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Overall Progress</p>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-2 bg-primary rounded-full w-3/5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Topics Completed: 12/20</p>
                <p className="text-sm text-muted-foreground">Next topic: Quantum Mechanics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
