import React, { useState } from "react";
import type {
  StudentPreferences,
  StudyHabits,
  ExamPreferences,
  LearningPreferences,
} from "../../types/ai-agent/preferences";
import StudyHabitsForm from "./StudyHabitsForm";
import ExamPreferencesForm from "./ExamPreferencesForm";
import LearningPreferencesForm from "./LearningPreferencesForm";
import AdaptiveSettingsForm from "./AdaptiveSettingsForm";

const defaultStudentPreferences: StudentPreferences = {
  studyHabits: {
    preferredStudyTime: "morning",
    sessionDuration: 45,
    breakDuration: 15,
    energyLevels: {
      morning: "high",
      afternoon: "medium",
      evening: "medium",
    },
    usePomodoroTechnique: false,
    pomodoroSettings: {
      workMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 15,
      cyclesBeforeLongBreak: 4,
    },
  },
  examPreferences: {
    difficultyLevel: "intermediate",
    targetGrade: "A",
    currentKnowledgeLevel: "basic",
    timeAvailablePerDay: 2,
    stressLevel: "medium",
    confidenceLevel: "medium",
  },
  adaptiveSettings: {
    receiveReminders: true,
    adjustForProcrastination: true,
    difficultyAdjustment: "automatic",
    stressManagement: true,
  },
};

interface StepComponentProps {
  values: StudyHabits | ExamPreferences | LearningPreferences;
  onChange: (
    values: StudyHabits | ExamPreferences | LearningPreferences
  ) => void;
}

interface FormStep {
  title: string;
  component: React.FC<StepComponentProps>;
  description: string;
}

const PreferencesForm: React.FC<{
  onSubmit: (preferences: StudentPreferences) => void;
  className?: string;
}> = ({ onSubmit, className = "" }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<StudentPreferences>(
    defaultStudentPreferences
  );

  const steps: FormStep[] = [
    {
      title: "Study Habits",
      component: StudyHabitsForm,
      description: "Configure your preferred study times and session durations",
    },
    {
      title: "Exam Preferences",
      component: ExamPreferencesForm,
      description: "Set your exam goals and current knowledge level",
    },
    {
      title: "Adaptive Settings",
      component: AdaptiveSettingsForm,
      description: "Configure how the AI agent adapts to your needs",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const getCurrentFormProps = () => {
    switch (currentStep) {
      case 0:
        return {
          values: preferences.studyHabits,
          onChange: (studyHabits: StudentPreferences["studyHabits"]) =>
            setPreferences({ ...preferences, studyHabits }),
        };
      case 1:
        return {
          values: preferences.examPreferences,
          onChange: (examPreferences: StudentPreferences["examPreferences"]) =>
            setPreferences({ ...preferences, examPreferences }),
        };
      case 2:
        return {
          values: preferences.adaptiveSettings,
          onChange: (
            adaptiveSettings: StudentPreferences["adaptiveSettings"]
          ) => setPreferences({ ...preferences, adaptiveSettings }),
        };
      default:
        return {};
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <button
                onClick={() => handleStepClick(index)}
                className={`flex flex-col items-center group ${
                  index <= currentStep
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={index > currentStep}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${
                      index < currentStep
                        ? "bg-green-500 text-white"
                        : index === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {step.title}
                </span>
                <span className="text-xs text-gray-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {step.description}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <CurrentStepComponent {...getCurrentFormProps()} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default PreferencesForm;
