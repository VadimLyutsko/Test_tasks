import {TaskType} from '../TodoList';
import {v1} from 'uuid';
import {useState} from 'react';
import {TasksStateType} from './App';

test('addTask should work',()=>{
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

    expect(tasks.length).toBe(3)
    addTask(`NewTask`)

    expect(tasks.length).toBe(4)
    expect(tasks).toEqual([
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'Some', isDone: true},
        {id: v1(), title: 'NewTask', isDone: false}
    ])
    expect(tasks[2].title).toBe('Some')

})

export {}