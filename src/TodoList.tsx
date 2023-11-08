import { FilterValuesType } from "./App"

export type Task = {
    id: number,
    title: string,
    isDone: boolean
}


type Props = {
    title: string
    tasks: Array<Task>,
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void
}


export function TodoList(props: Props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => {
                        return (
                            <li>
                                <input 
                                    type="checkbox" 
                                    checked={el.isDone} />
                                <span>
                                    {el.title}
                                </span>
                                <button
                                    onClick={ () => props.removeTask(el.id) }>
                                    x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    onClick={() => props.changeFilter('all')} >All</button>
                <button
                    onClick={() => props.changeFilter('active')} >Active</button>
                <button
                    onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};