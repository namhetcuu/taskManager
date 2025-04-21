import React from 'react';
import { FilterType } from '../types';
import { useTaskContext } from '../context/TaskContext';

const TaskFilter: React.FC = () => {
  const { filter, setFilter, tasks } = useTaskContext();
  
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: tasks.length },
    { type: 'completed', label: 'Completed', count: completedCount },
    { type: 'pending', label: 'Pending', count: pendingCount }
  ];
  
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm">
        {filters.map(({ type, label, count }) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium ${
              filter === type
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 ${
              type === 'all' ? 'rounded-l-md' : ''
            } ${
              type === 'pending' ? 'rounded-r-md' : ''
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;