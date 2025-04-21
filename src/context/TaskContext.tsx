import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, FilterType, TaskContextType } from '../types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });
  
  // Add a new task
  const addTask = (title: string) => {
    if (title.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  // Toggle task completion status
  const toggleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Edit task title
  const editTask = (id: string, title: string) => {
    if (title.trim() === '') return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, title: title.trim() } : task
      )
    );
  };
  
  const value = {
    tasks,
    filteredTasks,
    filter,
    addTask,
    deleteTask,
    toggleComplete,
    editTask,
    setFilter
  };
  
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
