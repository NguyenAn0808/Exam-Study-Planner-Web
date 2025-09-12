import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface NavBarProps {
  onAddNewExamClick: () => void;
}

export const Navbar = ({ onAddNewExamClick }: NavBarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Exam Study Planner</span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Button onClick={onAddNewExamClick} variant="default" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Exam
          </Button>
        </div>
      </div>
    </header>
  );
};
