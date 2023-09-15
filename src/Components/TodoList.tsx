import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App/App';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {Button, ButtonGroup, Checkbox, List, ListItem, Typography} from '@mui/material';

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeFilter: (newFilter: FilterValuesType) => void
    ClearCompletedTasks: () => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);

        return (
            <ListItem key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                <Checkbox
                    color={'default'}
                    onChange={changeTaskStatus}
                    checked={t.isDone}
                />
                <span>{t.title}</span>
            </ListItem>
        );
    };

    const tasksList = props.tasks.length
        ? <List>{props.tasks.map(getTasksListItem)}</List>
        : <span>All tasks completed</span>;

    const addTask = (title: string) => {
        props.addTask(title);
    };

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);


    return (
        <div>
            <Typography variant={'h4'} align={'center'}>
                <span>{props.title}</span>
            </Typography>

            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            {tasksList}
            <div style={{display: 'flex'}}>
                <span style={{marginRight: '20px'}}>{`${props.tasks.filter(i => !i.isDone).length} items left`}</span>
                <ButtonGroup style={{display: 'flex', justifyContent: 'space-around'}} disableElevation
                             variant="contained" size={'small'}>
                    <Button
                        style={{marginRight: '5px', borderRadius: '10px'}}
                        color={props.filter === 'all' ? 'primary' : 'secondary'}
                        onClick={handlerCreator('all')}
                    >All
                    </Button>
                    <Button
                        style={{marginRight: '5px', borderRadius: '10px'}}
                        color={props.filter === 'active' ? 'primary' : 'secondary'}
                        onClick={handlerCreator('active')}
                    >Active
                    </Button>
                    <Button
                        style={{borderRadius: '10px'}}
                        color={props.filter === 'completed' ? 'primary' : 'secondary'}
                        onClick={handlerCreator('completed')}
                    >Completed
                    </Button>
                </ButtonGroup>
                <span onClick={props.ClearCompletedTasks} style={{marginLeft: '20px', cursor:'pointer'}}>Clear completed</span>
            </div>
        </div>
    );
};

