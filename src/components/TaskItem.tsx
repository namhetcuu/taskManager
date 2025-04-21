import React, { useState } from 'react';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
  };
  
  const handleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      editTask(task.id, editedTitle);
    } else {
      setEditedTitle(task.title);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  return (
    <li className="flex items-center p-3 border-b border-gray-200 group animate-fade-in">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="mr-3 h-5 w-5 cursor-pointer"
      />
      
      {isEditing ? (
        <div className="flex-grow flex">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-grow border border-gray-300 p-1 rounded"
          />
          <button 
            onClick={handleSave} 
            className="mx-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel} 
            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span 
            className={`flex-grow ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
          >
            {task.title}
          </span>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleEdit} 
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;