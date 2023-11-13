import { useState } from 'react';
import { Task, TodoList } from './TodoList';
import { v1 } from 'uuid';
import './App.css';


export type FilterValuesType = 'all' | 'completed' | 'active';

type Todolist = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {

    const changeFilter = (value: FilterValuesType, todolistId: string): void => {
        let todolist = todolists.find( el => el.id === todolistId);
        if(todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    };

    const removeTask = (id: string, todolistId: string): void => {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter( el => el.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj})
    };

    const addTask = (title: string, todolistId: string): void => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [...tasks, newTask];
        tasksObj[todolistId1] = newTasks;
        setTasks({...tasksObj});
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        const task = tasks.find( (task) => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
        
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<Todolist>>([
        {
            id: todolistId1,
            title: 'what to learn',
            filter: 'active'
        },
        {
            id: todolistId2,
            title: 'what to buy',
            filter: 'completed'
        },
    ]);

    const [tasksObj, setTasks] = useState({
        [todolistId1]: [
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
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'book',
                isDone: false
            },
            {
                id: v1(),
                title: 'milk',
                isDone: true
            },
        ]
    })

    return (
        <div className="App">
            {
                todolists.map(el => {
                    let taskForTodolist = tasksObj[el.id];
                    if (el.filter === 'completed') {
                        taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                    };
                    if (el.filter === 'active') {
                        taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                    };
                    return (
                        <TodoList
                            key={el.id}
                            id={el.id}
                            title={el.title} 
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={el.filter} />
                    )
                })
            }
        </div>
    );
};


export default App;