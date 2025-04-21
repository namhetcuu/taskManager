import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const { addTask } = useTaskContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center border-b border-gray-300 py-2">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;