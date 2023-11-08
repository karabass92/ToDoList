import { Task, TodoList } from './TodoList';
import './App.css';


function App() {

    let tasks1: Array<Task> = [
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
    ];

    let tasks2: Array<Task> = [
        {
            id: 1,
            title: 'Terminator',
            isDone: true
        },
        {
            id: 2,
            title: 'XXX',
            isDone: false
        },
        {
            id: 3,
            title: 'Atlas',
            isDone: false
        },
    ];

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1} />
            <TodoList title={'Movies'} tasks={tasks2} />
        </div>
    );
};


export default App;