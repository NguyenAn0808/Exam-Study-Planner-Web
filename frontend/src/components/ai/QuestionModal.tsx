import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  topicName: string | null;
  questions: Question[] | null;
  isLoading: boolean;
  onGenerate: () => void;
}

const stripOptionPrefix = (optionText: string) => {
  return optionText.replace(/^[A-D][.)]\s*/, "").trim();
};

export const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onOpenChange,
  topicName,
  questions,
  isLoading,
  onGenerate,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleSelectAnswer = (qIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset state on close
      setSelectedAnswers({});
      setShowAnswers(false);
    }
    onOpenChange(open);
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setShowAnswers(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Practice Questions for "{topicName}"</DialogTitle>
          <DialogDescription>
            Test your knowledge with these AI-generated questions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : !questions ? (
            <div className="text-center">
              <p className="mb-4">Click below to generate questions.</p>
              <Button onClick={onGenerate}>Generate Questions</Button>
            </div>
          ) : (
            questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-4 border rounded-lg bg-background/50"
              >
                <p className="font-semibold mb-3">
                  {qIndex + 1}. {q.questionText}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, oIndex) => {
                    const optionLetter = String.fromCharCode(65 + oIndex);
                    const isSelected = selectedAnswers[qIndex] === optionLetter;
                    const isCorrect = q.correctAnswer === optionLetter;

                    const cleanOptionText = stripOptionPrefix(option);

                    return (
                      <Button
                        key={oIndex}
                        variant="outline"
                        // Disable button after submitting
                        disabled={showAnswers}
                        className={cn(
                          "justify-start text-left h-auto py-2 whitespace-normal transition-all",
                          // Style for selected but not yet submitted
                          isSelected &&
                            !showAnswers &&
                            "border-primary ring-2 ring-primary/50",
                          // Style for correct answer after submission
                          showAnswers &&
                            isCorrect &&
                            "bg-green-100 border-green-500 text-green-800 hover:bg-green-100",
                          // Style for incorrect answer (if selected) after submission
                          showAnswers &&
                            !isCorrect &&
                            isSelected &&
                            "bg-red-100 border-red-500 text-red-800 hover:bg-red-100"
                        )}
                        onClick={() => handleSelectAnswer(qIndex, optionLetter)}
                      >
                        <span className="font-bold mr-3 shrink-0">
                          {optionLetter}
                        </span>
                        <span>{cleanOptionText}</span>{" "}
                        {/* Use the cleaned text */}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {questions && !isLoading && (
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={onGenerate}>
              Regenerate
            </Button>

            {showAnswers ? (
              <Button onClick={handleTryAgain}>Try Again</Button>
            ) : (
              <Button onClick={() => setShowAnswers(true)}>Submit</Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
