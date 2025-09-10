import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-background text-center p-4">
      <div className="bg-card p-8 rounded-2xl shadow-custom-lg animate-fade-in max-w-md w-full">
        <h1 className="text-8xl font-bold text-primary animate-bounce">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="mt-2 text-muted-foreground">
          Oops! The page you're looking for seems to have taken a detour.
        </p>
        <img
          src="/404_NotFound.png"
          alt="A lost robot"
          className="max-w-full w-64 mx-auto my-8"
        />
        <Button
          asChild
          size="lg"
          className="transition-transform hover:scale-105"
        >
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Homepage
          </Link>
        </Button>
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Exam Study Planner &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
