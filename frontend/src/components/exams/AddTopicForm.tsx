import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Clock } from "lucide-react";
import { toast } from "sonner";

interface AddTopicFormProps {
  onSubmit: (name: string, estimatedMinutes: number) => void;
  isAdding: boolean;
}

export const AddTopicForm: React.FC<AddTopicFormProps> = ({
  onSubmit,
  isAdding,
}) => {
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estimatedMinutes = parseInt(minutes, 10);
    if (name.trim() && !isNaN(estimatedMinutes) && estimatedMinutes > 0) {
      onSubmit(name.trim(), estimatedMinutes);
      setName("");
      setMinutes("");
    } else {
      toast.error("Please enter a valid topic name and estimated time.");
    }
  };

  return (
    <Card className="p-6 border-0 bg-white shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        {/* Name Input */}
        <Input
          type="text"
          placeholder="What needs to be studied?"
          className="h-12 text-base bg-slate-50 flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="relative w-full md:w-48">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Est. Minutes"
            className="h-12 text-base bg-slate-50 pl-10"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="1"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="px-6 w-full md:w-auto"
          disabled={!name.trim() || !minutes || isAdding}
        >
          <Plus className="size-5 mr-2" />
          {isAdding ? "Adding..." : "Add Topic"}
        </Button>
      </form>
    </Card>
  );
};
