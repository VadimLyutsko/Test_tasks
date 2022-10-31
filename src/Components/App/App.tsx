import React, {useState} from 'react';
import './App.css';
import  {TaskType,TodoList} from '../TodoList';
import {v1} from 'uuid';
import {Container, Grid, Paper} from '@material-ui/core';


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = Array<TaskType>


function App() {

    // const [todoListTitle, setTodoListTitle] = useState('Todos');
    const todoListTitle = 'Todos';
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<TasksStateType>([
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'HTML&CSS', isDone: true},
    ]);


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks([newTask, ...tasks]);
    };

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks([...tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)]);
    };

    const getFilteredTasks = (t: TasksStateType, f: FilterValuesType) => {
        switch (f) {
            case 'active':
                return t.filter(t => !t.isDone);
            case 'completed':
                return t.filter(t => t.isDone);
        }
        return t;
    };

    const ClearCompletedTasks = () => {
        setTasks(getFilteredTasks(tasks, 'active'));
    };


    return (
        <div className="App">

            <Container fixed>
                <Grid container>
                    <Grid item>
                        <Paper
                            variant={'outlined'}
                            // elevation={10}
                            style={{width: '470px', padding: '20px', marginLeft: '300px'}}>
                            <TodoList
                                filter={filter}
                                tasks={getFilteredTasks(tasks, filter)}
                                title={todoListTitle}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeFilter={setFilter}
                                ClearCompletedTasks={ClearCompletedTasks}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
