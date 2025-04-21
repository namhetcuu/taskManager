import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskFilter from './components/TaskFilter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-lg mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-600">Manage your tasks efficiently</p>
          </header>
          
          <main className="bg-white rounded-lg shadow-md p-6">
            <TaskForm />
            <TaskFilter />
            <TaskList />
          </main>
          
          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Task Manager App</p>
          </footer>
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;