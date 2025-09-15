import React, { useState } from "react";
import { useAI } from "@/contexts/AIContext";
import { useNavigate } from "react-router-dom";
import PreferencesForm from "@/components/ai-agent-form/PreferencesForm";
import type { StudentPreferences } from "@/types/ai-agent/preferences";
import { toast } from "sonner";

const StudyPlannerPage: React.FC = () => {
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { loading, error, generateStudyPlan } = useAI();

  const handleSubmit = async (preferences: StudentPreferences) => {
    if (!examDate || !subject) {
      toast.error("Please select an exam date and subject");
      return;
    }

    try {
      await generateStudyPlan(preferences, examDate, subject, description);
      toast.success("Study plan created! Redirecting to exam list...");
      // Redirect to exams page after successful creation
      setTimeout(() => navigate("/exams"), 2000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create study plan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Study Planner
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setExamDate(new Date(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter exam name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you want to study in detail. This will help the AI generate a more focused study plan."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-32 resize-none"
              />
            </div>
          </div>

          <PreferencesForm onSubmit={handleSubmit} className="mt-6" />
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-center mt-4">
                Generating your personalized study plan...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlannerPage;
