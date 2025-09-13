export const getDeadlineColor = (daysLeft: number): string => {
  if (daysLeft < 0) return "bg-red-600 text-white"; // Overdue
  if (daysLeft <= 1) return "bg-red-500 text-white"; // Today or Tomorrow
  if (daysLeft <= 3) return "bg-orange-500 text-white"; // 2-3 days left
  if (daysLeft <= 7) return "bg-yellow-400 text-yellow-900"; // 4-7 days left
  return "bg-gray-100 text-gray-800"; // More than a week
};
