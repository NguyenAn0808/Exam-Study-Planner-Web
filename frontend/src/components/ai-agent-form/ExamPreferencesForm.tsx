import React from 'react';
import type { ExamPreferences } from '../../types/ai-agent/preferences';

interface ExamPreferencesFormProps {
  values: ExamPreferences;
  onChange: (values: ExamPreferences) => void;
}

const ExamPreferencesForm: React.FC<ExamPreferencesFormProps> = ({ values, onChange }) => {
  const handleChange = (field: keyof ExamPreferences, value: any) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Exam Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            value={values.difficultyLevel}
            onChange={(e) => handleChange('difficultyLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Grade
          </label>
          <select
            value={values.targetGrade}
            onChange={(e) => handleChange('targetGrade', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Knowledge Level
          </label>
          <select
            value={values.currentKnowledgeLevel}
            onChange={(e) => handleChange('currentKnowledgeLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="none">No Prior Knowledge</option>
            <option value="basic">Basic Understanding</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Available Per Day (hours)
          </label>
          <input
            type="number"
            value={values.timeAvailablePerDay}
            onChange={(e) => handleChange('timeAvailablePerDay', parseFloat(e.target.value))}
            min="0.5"
            max="12"
            step="0.5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Stress Level
          </label>
          <select
            value={values.stressLevel}
            onChange={(e) => handleChange('stressLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confidence Level
          </label>
          <select
            value={values.confidenceLevel}
            onChange={(e) => handleChange('confidenceLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExamPreferencesForm;