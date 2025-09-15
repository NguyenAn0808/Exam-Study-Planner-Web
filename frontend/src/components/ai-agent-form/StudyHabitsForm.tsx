import React from 'react';
import type { StudyHabits } from '../../types/ai-agent/preferences';

interface StudyHabitsFormProps {
  values: StudyHabits;
  onChange: (values: StudyHabits) => void;
}

const StudyHabitsForm: React.FC<StudyHabitsFormProps> = ({ values, onChange }) => {
  const handleChange = (field: keyof StudyHabits, value: any) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  const handleEnergyLevelChange = (timeOfDay: keyof typeof values.energyLevels, value: 'low' | 'medium' | 'high') => {
    onChange({
      ...values,
      energyLevels: {
        ...values.energyLevels,
        [timeOfDay]: value,
      },
    });
  };

  const handlePomodoroSettingsChange = (field: keyof NonNullable<StudyHabits['pomodoroSettings']>, value: number) => {
    onChange({
      ...values,
      pomodoroSettings: {
        ...values.pomodoroSettings,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Study Habits</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Study Time
          </label>
          <select
            value={values.preferredStudyTime}
            onChange={(e) => handleChange('preferredStudyTime', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="early_morning">Early Morning</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="late_night">Late Night</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Duration (minutes)
          </label>
          <input
            type="number"
            value={values.sessionDuration}
            onChange={(e) => handleChange('sessionDuration', parseInt(e.target.value))}
            min="15"
            max="240"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            value={values.breakDuration}
            onChange={(e) => handleChange('breakDuration', parseInt(e.target.value))}
            min="5"
            max="60"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Energy Levels Throughout the Day
          </label>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(values.energyLevels).map(([timeOfDay, level]) => (
              <div key={timeOfDay}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                  {timeOfDay}
                </label>
                <select
                  value={level}
                  onChange={(e) => handleEnergyLevelChange(timeOfDay as keyof typeof values.energyLevels, e.target.value as 'low' | 'medium' | 'high')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={values.usePomodoroTechnique}
              onChange={(e) => handleChange('usePomodoroTechnique', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Use Pomodoro Technique
            </label>
          </div>
        </div>

        {values.usePomodoroTechnique && (
          <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-900">Pomodoro Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  value={values.pomodoroSettings?.workMinutes ?? 25}
                  onChange={(e) => handlePomodoroSettingsChange('workMinutes', parseInt(e.target.value))}
                  min="15"
                  max="60"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Break (minutes)
                </label>
                <input
                  type="number"
                  value={values.pomodoroSettings?.shortBreakMinutes ?? 5}
                  onChange={(e) => handlePomodoroSettingsChange('shortBreakMinutes', parseInt(e.target.value))}
                  min="3"
                  max="15"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long Break (minutes)
                </label>
                <input
                  type="number"
                  value={values.pomodoroSettings?.longBreakMinutes ?? 15}
                  onChange={(e) => handlePomodoroSettingsChange('longBreakMinutes', parseInt(e.target.value))}
                  min="15"
                  max="30"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sessions Before Long Break
                </label>
                <input
                  type="number"
                  value={values.pomodoroSettings?.cyclesBeforeLongBreak ?? 4}
                  onChange={(e) => handlePomodoroSettingsChange('cyclesBeforeLongBreak', parseInt(e.target.value))}
                  min="2"
                  max="6"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyHabitsForm;