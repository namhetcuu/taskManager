export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
  }
  
  export type FilterType = 'all' | 'completed' | 'pending';
  
  export interface TaskContextType {
    tasks: Task[];
    filteredTasks: Task[];
    filter: FilterType;
    addTask: (title: string) => void;
    deleteTask: (id: string) => void;
    toggleComplete: (id: string) => void;
    editTask: (id: string, title: string) => void;
    setFilter: (filter: FilterType) => void;
  }