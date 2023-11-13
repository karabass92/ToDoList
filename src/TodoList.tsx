import { FilterValuesType } from "./App"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import './App.css'

export type Task = {
    id: string,
    title: string,
    isDone: boolean
}


type Props = {
    id: string,
    title: string
    tasks: Array<Task>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
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
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        } 
    };

    const addTask = (): void => {
        if(newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        };
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle('');
    };

    const onAllClickHandler = (): void => props.changeFilter('all', props.id);

    const onCompletedClickHandler = (): void => props.changeFilter('completed', props.id);

    const onActiveClickHandler = (): void => props.changeFilter('active', props.id);

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
                        const onRemoveHandler = (): void => props.removeTask(el.id, props.id);
                        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
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