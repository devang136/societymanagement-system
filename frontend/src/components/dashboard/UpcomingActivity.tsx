import React from 'react';

interface ActivityProps {
  activity: {
    id: number;
    title: string;
    type: 'society' | 'holi' | 'ganesh' | 'navratri';
    timeRange: string;
    date: string;
  };
}

export function UpcomingActivity({ activity }: ActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'society':
        return 'S';
      case 'holi':
        return 'H';
      case 'ganesh':
        return 'G';
      case 'navratri':
        return 'N';
      default:
        return 'E';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'society':
        return 'bg-orange-100 text-orange-600';
      case 'holi':
        return 'bg-green-100 text-green-600';
      case 'ganesh':
        return 'bg-blue-100 text-blue-600';
      case 'navratri':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex items-center space-x-3 py-2">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.timeRange}</p>
      </div>
      <div className="text-xs text-gray-500">{activity.date}</div>
    </div>
  );
}
// UpcomingActivity dashboard file 