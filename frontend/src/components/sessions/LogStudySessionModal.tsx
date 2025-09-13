import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLogStudySession } from "@/hooks/useLogStudySession";
import type { ITopic } from "@/types";
import { toast } from "sonner";

interface LogStudySessionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  examId: string;
  examTitle: string;
  topic: ITopic;
}
export const LogStudySessionModal: React.FC<LogStudySessionModalProps> = ({
  isOpen,
  onOpenChange,
  examId,
  examTitle,
  topic,
}) => {
  const [minutes, setMinutes] = useState("");
  const { mutate: logSession, isPending } = useLogStudySession();

  const handleSubmit = () => {
    const duration = parseInt(minutes, 10);
    if (isNaN(duration) || duration <= 0) {
      toast.error("Please enter a valid duration in minutes.");
      return;
    }

    logSession(
      { durationMinutes: duration, examId, topicId: topic._id },
      {
        onSuccess: () => {
          onOpenChange(false);
          setMinutes("");
        },
      }
    );
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setMinutes("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Time for Topic: "{topic.name}"</DialogTitle>
          <DialogDescription>
            How many minutes did you spend studying "{topic.name}" for the "
            {examTitle}" exam?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="minutes" className="text-right">
              Duration (in minutes)
            </Label>
            <Input
              id="minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="e.g., 45"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !minutes}>
            {isPending ? "Logging..." : "Log Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
