import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddTopicFormProps {
  onSubmit: (name: string) => void;
  isAdding: boolean;
}

export const AddTopicForm: React.FC<AddTopicFormProps> = ({
  onSubmit,
  isAdding,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    } else {
      toast.error("Please enter a topic name.");
    }
  };

  return (
    <Card className="p-6 border-0 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="What needs to be studied?"
          className="h-12 text-base bg-slate-50 sm:flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          size="lg"
          className="px-6"
          disabled={!name.trim() || isAdding}
        >
          <Plus className="size-5 mr-2" />
          {isAdding ? "Adding..." : "Add Topic"}
        </Button>
      </form>
    </Card>
  );
};
