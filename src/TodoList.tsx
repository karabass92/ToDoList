import { FilterValuesType } from "./App"
import { ChangeEvent, useState, KeyboardEvent } from "react"

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
    addTask: (title: string) => void
}


export function TodoList(props: Props) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
        if(e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        } 
    };

    const addTask = (): void => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
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
                    onKeyPress={onKeyPressHandler} />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => {
                        const onRemoveHandler = (): void => props.removeTask(el.id);
                        return (
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone} />
                                <span>{el.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};