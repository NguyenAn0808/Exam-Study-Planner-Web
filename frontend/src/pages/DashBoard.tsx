import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, BookOpen, Target, TrendingUp } from "lucide-react";

export default function DashBoard() {
  const navigate = useNavigate();

  const handleViewAllExams = () => {
    navigate("/exams");
  };

  const handleViewAllActivity = () => {
    navigate("/activity");
  };

  const handleViewProgressDetails = () => {
    navigate("/progress");
  };

  const handleViewFullSchedule = () => {
    navigate("/schedule");
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your study planner!
          </p>
        </div>
        <Button variant="default" size="lg" onClick={handleViewFullSchedule}>
          <Calendar className="mr-2 h-5 w-5" />
          Plan New Study Session
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No upcoming exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0h</div>
            <p className="text-xs text-muted-foreground">Start studying</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Topics Covered
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0/0</div>
            <p className="text-xs text-muted-foreground">No topics yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Start your journey</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Exams and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Upcoming Exams</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewAllExams}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <BookOpen className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No exams scheduled yet</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => navigate("/exams")}
              >
                Add your first exam
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewAllActivity}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Clock className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No recent activity</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => navigate("/activity")}
              >
                Start studying
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Progress */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Study Progress</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewProgressDetails}
            >
              View details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Target className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No progress data available
              </p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => navigate("/progress")}
              >
                Set study goals
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Preview */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>This Week</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewFullSchedule}>
              Full schedule
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Calendar className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No scheduled sessions</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => navigate("/schedule")}
              >
                Plan a session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
