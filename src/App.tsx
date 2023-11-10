import { useState } from 'react';
import { Task, TodoList } from './TodoList';
import { v1 } from 'uuid';
import './App.css';


export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: v1(),
            title: 'CSS',
            isDone: true
        },
        {
            id: v1(),
            title: 'JS',
            isDone: true
        },
        {
            id: v1(),
            title: 'React',
            isDone: false
        },
        {
            id: v1(),
            title: 'Redux',
            isDone: false
        },
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (value: FilterValuesType): void => {
        setFilter(value);
    };

    const removeTask = (id: string): void => {
        setTasks(tasks.filter( el => el.id !== id)) 
    };

    const addTask = (title: string): void => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find( (task) => task.id === id);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([ ...tasks ]);
    }


    let taskForTodolist = tasks;
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(el => el.isDone === true)
    };
    if (filter === 'active') {
        taskForTodolist = tasks.filter(el => el.isDone === false)
    };

    return (
        <div className="App">
            <TodoList 
                title={'What to learn'} 
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter} />
        </div>
    );
};


export default App;