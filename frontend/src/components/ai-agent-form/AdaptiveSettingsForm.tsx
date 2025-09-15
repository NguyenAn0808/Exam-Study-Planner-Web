import React from 'react';
import type { StudentPreferences } from '../../types/ai-agent/preferences';

interface AdaptiveSettingsFormProps {
  values: StudentPreferences['adaptiveSettings'];
  onChange: (values: StudentPreferences['adaptiveSettings']) => void;
}

const AdaptiveSettingsForm: React.FC<AdaptiveSettingsFormProps> = ({ values, onChange }) => {
  const handleChange = (field: keyof typeof values, value: any) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Adaptive Learning Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={values.receiveReminders}
            onChange={(e) => handleChange('receiveReminders', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Receive study reminders and notifications
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={values.adjustForProcrastination}
            onChange={(e) => handleChange('adjustForProcrastination', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Adjust schedule to help prevent procrastination
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Adjustment
          </label>
          <select
            value={values.difficultyAdjustment}
            onChange={(e) => handleChange('difficultyAdjustment', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={values.stressManagement}
            onChange={(e) => handleChange('stressManagement', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Enable stress management features
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveSettingsForm;