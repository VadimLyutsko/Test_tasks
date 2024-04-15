export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksStateType = Array<TaskType>;

export type TodoListPropsType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  changeFilter: (newFilter: FilterValuesType) => void;
  ClearCompletedTasks: () => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
