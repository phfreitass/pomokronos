import { useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskConxtext } from './TaskContext';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  return (
    <TaskConxtext.Provider value={{ state, setState }}>
      {children}
    </TaskConxtext.Provider>
  );
}
