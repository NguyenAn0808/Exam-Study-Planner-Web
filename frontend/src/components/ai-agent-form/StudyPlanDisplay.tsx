import React from 'react';
import type { StudyPlan, DailySchedule, WeeklyMilestone } from '../../types/ai-agent/study-plan';

interface TimelineItemProps {
  time: string;
  duration: number;
  title: string;
  description: string;
  type: 'study' | 'practice' | 'review' | 'break';
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, duration, title, description, type }) => {
  const getBgColor = () => {
    switch (type) {
      case 'study':
        return 'bg-blue-100';
      case 'practice':
        return 'bg-green-100';
      case 'review':
        return 'bg-purple-100';
      case 'break':
        return 'bg-gray-100';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'study':
        return 'text-blue-800';
      case 'practice':
        return 'text-green-800';
      case 'review':
        return 'text-purple-800';
      case 'break':
        return 'text-gray-800';
    }
  };

  return (
    <div className={`flex items-start p-4 rounded-lg mb-4 ${getBgColor()}`}>
      <div className="w-32 flex-shrink-0">
        <div className={`text-sm font-semibold ${getTextColor()}`}>
          {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm text-gray-500">{duration} mins</div>
      </div>
      <div className="flex-grow">
        <h4 className={`font-medium ${getTextColor()}`}>{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface DailyScheduleCardProps {
  schedule: DailySchedule;
}

const DailyScheduleCard: React.FC<DailyScheduleCardProps> = ({ schedule }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {new Date(schedule.date).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h3>
      <div className="space-y-2 mb-4">
        {schedule.dailyGoals.map((goal, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
              <span className="text-white text-xs">✓</span>
            </span>
            {goal}
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {schedule.sessions.map((session, index) => (
          <TimelineItem
            key={index}
            time={session.startTime}
            duration={session.duration}
            title={session.topic}
            description={session.description || session.recommendedMethod}
            type={session.activityType}
          />
        ))}
      </div>
    </div>
  );
};

interface WeeklyMilestoneCardProps {
  milestone: WeeklyMilestone;
}

const WeeklyMilestoneCard: React.FC<WeeklyMilestoneCardProps> = ({ milestone }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Week {milestone.weekNumber}</h3>
        <span className="text-sm text-gray-500">
          {new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}
        </span>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Topics</h4>
        <div className="flex flex-wrap gap-2">
          {milestone.topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Expected Progress</h4>
        <p className="text-sm text-gray-600">{milestone.expectedProgress}</p>
      </div>
      <div>
        <h4 className="font-medium mb-2">Assessment Criteria</h4>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {milestone.assessmentCriteria.map((criteria, index) => (
            <li key={index}>{criteria}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface StudyPlanDisplayProps {
  plan: StudyPlan;
}

const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan }) => {
  const [activeTab, setActiveTab] = React.useState<'daily' | 'weekly'>('daily');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Study Plan</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Subject</h3>
            <p className="text-gray-700">{plan.subject}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Exam Date</h3>
            <p className="text-gray-700">
              {new Date(plan.examDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Target Grade</h3>
            <p className="text-gray-700">{plan.targetGrade}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Duration</h3>
            <p className="text-gray-700">{plan.totalWeeks} weeks</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${plan.progressTracking.overallProgress}%` }}
            ></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-2">Mastered Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {plan.progressTracking.masteredConcepts.map((concept, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-2">Areas for Improvement</h4>
              <div className="flex flex-wrap gap-2">
                {plan.progressTracking.areasForImprovement.map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(plan.adaptiveRecommendations).map(([category, items]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'daily'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Daily Schedule
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weekly Milestones
            </button>
          </div>

          {activeTab === 'daily' ? (
            <div className="space-y-6">
              {plan.dailySchedules.map((schedule, index) => (
                <DailyScheduleCard key={index} schedule={schedule} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {plan.weeklySchedule.map((milestone, index) => (
                <WeeklyMilestoneCard key={index} milestone={milestone} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanDisplay;