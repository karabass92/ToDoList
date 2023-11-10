import { FilterValuesType } from "./App"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import './App.css'

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}


type Props = {
    title: string
    tasks: Array<Task>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void,
    changeTaskStatus: (id: string, isDone: boolean) => void,
    filter: FilterValuesType
}


export function TodoList(props: Props) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if(e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        } 
    };

    const addTask = (): void => {
        if(newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        };
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle('');
    };

    const onAllClickHandler = (): void => props.changeFilter('all');

    const onCompletedClickHandler = (): void => props.changeFilter('completed');

    const onActiveClickHandler = (): void => props.changeFilter('active');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input 
                    value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ''} />
                <button onClick={addTask}>+</button>
                { error && <div className="error-message">{error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(el => {
                        const onRemoveHandler = (): void => props.removeTask(el.id);
                        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked)
                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={el.isDone} onChange={onStatusChangeHandler} />
                                <span>{el.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button 
                    onClick={onAllClickHandler} 
                    className={props.filter === 'all' ? 'active-filter' : '' }>All</button>
                <button 
                    onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : '' } >Active</button>
                <button 
                    onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : '' } >Completed</button>
            </div>
        </div>
    );
};