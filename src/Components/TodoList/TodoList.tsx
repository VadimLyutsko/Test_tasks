import React, { ChangeEvent } from 'react';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { Button, ButtonGroup, Checkbox, List, ListItem, Typography } from '@mui/material';
import styles from './TodoList.module.scss';
import clsx from 'clsx';
import { FilterValuesType, TaskType, TodoListPropsType } from '../../Types/types';

export const TodoList = (props: TodoListPropsType) => {
  const getTasksListItem = (t: TaskType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked);

    const listItemClasses = clsx({
      [styles.isDone]: t.isDone,
      [styles.notIsDone]: !t.isDone,
    });

    return (
      <ListItem key={t.id} className={styles.listItem}>
        <Checkbox color={'default'} onChange={changeTaskStatus} checked={t.isDone} />
        <span className={listItemClasses}>{t.title}</span>
      </ListItem>
    );
  };

  const tasksList = props.tasks.length ? (
    <List>{props.tasks.map(getTasksListItem)}</List>
  ) : (
    <div className={styles.emptyList}>All tasks completed</div>
  );

  const addTask = (title: string) => {
    props.addTask(title);
  };

  const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);

  return (
    <div>
      <Typography variant={'h4'} align={'center'}>
        <span className={styles.title}>{props.title}</span>
      </Typography>

      <div>
        <AddItemForm addItem={addTask} />
      </div>
      {tasksList}
      <div className={styles.controlPanel}>
        <span className={styles.leftTasks}>
          {`${props.tasks.filter((i) => !i.isDone).length}`}&nbsp;
          <span className={styles.displayNone}>{`items`}&nbsp;</span>left
        </span>
        <ButtonGroup disableElevation variant="contained" size={'small'}>
          <Button
            className={styles.button}
            style={{ marginRight: '5px', borderRadius: '10px', fontFamily: 'Poppins,sans-serif' }}
            color={props.filter === 'all' ? 'primary' : 'secondary'}
            onClick={handlerCreator('all')}
          >
            All
          </Button>
          <Button
            className={styles.button}
            style={{ marginRight: '5px', borderRadius: '10px', fontFamily: 'Poppins,sans-serif' }}
            color={props.filter === 'active' ? 'primary' : 'secondary'}
            onClick={handlerCreator('active')}
          >
            Active
          </Button>
          <Button
            className={styles.button}
            style={{ borderRadius: '10px', fontFamily: 'Poppins,sans-serif' }}
            color={props.filter === 'completed' ? 'primary' : 'secondary'}
            onClick={handlerCreator('completed')}
          >
            Completed
          </Button>
        </ButtonGroup>
        <button onClick={props.ClearCompletedTasks}>
          <span className={styles.clearButton}>Clear completed</span>
        </button>
      </div>
    </div>
  );
};
