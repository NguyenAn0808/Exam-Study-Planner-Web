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
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 upcoming this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5h</div>
            <p className="text-xs text-muted-foreground">
              +2.5h from last week
            </p>
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
            <div className="text-2xl font-bold">15/20</div>
            <p className="text-xs text-muted-foreground">75% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
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
            {/* Exam cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Mathematics Final</h3>
                  <p className="text-sm text-muted-foreground">
                    15 topics remaining
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Sept 20, 2024</p>
                  <p className="text-sm text-muted-foreground">5 days left</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Physics Midterm</h3>
                  <p className="text-sm text-muted-foreground">
                    8 topics remaining
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Sept 25, 2024</p>
                  <p className="text-sm text-muted-foreground">10 days left</p>
                </div>
              </div>
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
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Completed "Integration" topic
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              {/* Add more activity items */}
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
            <div className="space-y-4">{/* Progress bars */}</div>
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
            <div className="space-y-4">{/* Schedule items */}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
