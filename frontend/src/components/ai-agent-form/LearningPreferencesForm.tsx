import React from 'react';
import type { LearningPreferences } from '../../types/ai-agent/preferences';

interface LearningPreferencesFormProps {
  values: LearningPreferences;
  onChange: (values: LearningPreferences) => void;
}

const LearningPreferencesForm: React.FC<LearningPreferencesFormProps> = ({ values, onChange }) => {
  const handleChange = (field: keyof LearningPreferences, value: any) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  const handleStyleToggle = (style: LearningPreferences['styles'][number]) => {
    const newStyles = values.styles.includes(style)
      ? values.styles.filter(s => s !== style)
      : [...values.styles, style];
    handleChange('styles', newStyles);
  };

  const handleGroupStudyChange = (field: keyof typeof values.groupStudy, value: any) => {
    handleChange('groupStudy', {
      ...values.groupStudy,
      [field]: value,
    });
  };

  const handlePracticeMethodToggle = (method: LearningPreferences['practiceMethods'][number]) => {
    const newMethods = values.practiceMethods.includes(method)
      ? values.practiceMethods.filter(m => m !== method)
      : [...values.practiceMethods, method];
    handleChange('practiceMethods', newMethods);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Learning Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Styles
          </label>
          <div className="space-y-2">
            {[
              { value: 'visual', label: 'Visual Learning' },
              { value: 'auditory', label: 'Auditory Learning' },
              { value: 'kinesthetic', label: 'Kinesthetic Learning' },
              { value: 'reading_writing', label: 'Reading/Writing' },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={values.styles.includes(value as any)}
                  onChange={() => handleStyleToggle(value as any)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Group Study Preferences</h3>
          
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={values.groupStudy.preferred}
                onChange={(e) => handleGroupStudyChange('preferred', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I prefer studying in groups
              </label>
            </div>
          </div>

          {values.groupStudy.preferred && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Study Frequency
                </label>
                <select
                  value={values.groupStudy.frequency}
                  onChange={(e) => handleGroupStudyChange('frequency', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="often">Often</option>
                  <option value="always">Always</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Group Size
                </label>
                <input
                  type="number"
                  value={values.groupStudy.groupSize}
                  onChange={(e) => handleGroupStudyChange('groupSize', parseInt(e.target.value))}
                  min="2"
                  max="8"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Frequency
          </label>
          <select
            value={values.reviewFrequency}
            onChange={(e) => handleChange('reviewFrequency', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="alternate_days">Alternate Days</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Practice Methods
          </label>
          <div className="space-y-2">
            {[
              { value: 'practice_tests', label: 'Practice Tests' },
              { value: 'flashcards', label: 'Flashcards' },
              { value: 'summarization', label: 'Summarization' },
              { value: 'teaching_others', label: 'Teaching Others' },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={values.practiceMethods.includes(value as any)}
                  onChange={() => handlePracticeMethodToggle(value as any)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferencesForm;