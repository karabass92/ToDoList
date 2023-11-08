import { useState } from 'react';
import { Task, TodoList } from './TodoList';
import './App.css';


export type FilterValuesType = 'all' | 'completed' | 'active';


function App() {

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'CSS',
            isDone: true
        },
        {
            id: 2,
            title: 'JS',
            isDone: true
        },
        {
            id: 3,
            title: 'React',
            isDone: false
        },
        {
            id: 4,
            title: 'Redux',
            isDone: false
        },
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: number) {
        setTasks(tasks.filter( el => el.id !== id)) 
    };

    let taskForTodolist = tasks;
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(el => el.isDone === true)
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(el => el.isDone === false)
    }

    return (
        <div className="App">
            <TodoList 
                title={'What to learn'} 
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter} />
        </div>
    );
};


export default App;