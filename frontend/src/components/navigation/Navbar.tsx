import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { MobileNav } from "./MobileNav";

interface NavbarProps {
  stats?: {
    examCount: number | null;
    topicsCompleted: number | null;
    totalTopics: number | null;
    overallProgress: number | null;
  };
}

export const Navbar = ({
  stats = {
    examCount: null,
    topicsCompleted: null,
    totalTopics: null,
    overallProgress: null,
  },
}: NavbarProps) => {
  const { openCreateExamModal } = useModal();
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <MobileNav stats={stats} />

        <Link to="/" className="flex items-center gap-2 ml-4 lg:ml-0">
          <span className="font-bold text-xl">Exam Study Planner</span>
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            onClick={openCreateExamModal}
            className="hidden sm:flex"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Exam
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={openCreateExamModal}
            className="sm:hidden"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
