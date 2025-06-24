import { useContext } from 'react';
import { TaskConxtext } from './TaskContext';

export function useTaskContext() {
  return useContext(TaskConxtext);
}
