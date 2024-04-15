import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { v1 } from 'uuid';
import styles from './App.module.scss';
import { Container } from '../Container/Container';
import { FilterValuesType, TaskType, TasksStateType } from '../../Types/types';

function App() {
  const todoListTitle = 'Todos';
  const [filter, setFilter] = useState<FilterValuesType>('all');
  const [tasks, setTasks] = useState<TasksStateType>([
    { id: v1(), title: 'Milk', isDone: false },
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'HTML&CSS', isDone: false },
  ]);

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
    setTasks([...tasks.map((t) => (t.id === taskId ? { ...t, isDone: newTaskStatus } : t))]);
  };

  const getFilteredTasks = (t: TasksStateType, f: FilterValuesType) => {
    switch (f) {
      case 'active':
        return t.filter((t) => !t.isDone);
      case 'completed':
        return t.filter((t) => t.isDone);
    }
    return t;
  };

  const ClearCompletedTasks = () => {
    setTasks(getFilteredTasks(tasks, 'active'));
  };

  return (
    <Container>
      <div className={styles.App}>
        <TodoList
          filter={filter}
          tasks={getFilteredTasks(tasks, filter)}
          title={todoListTitle}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          changeFilter={setFilter}
          ClearCompletedTasks={ClearCompletedTasks}
        />
      </div>
    </Container>
  );
}

export default App;
