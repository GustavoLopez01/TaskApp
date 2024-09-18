
import { useMemo, Dispatch } from "react"
import { ActionsTask } from "../reducers/TaskReducer"
import type { Task } from "../types"
import { PencilIcon, TrashIcon }  from "@heroicons/react/24/outline"
import { categories } from "../data"

type TaskListProps = {
    tasks: Task[],
    dispatch: Dispatch<ActionsTask>
}

export const TaskList = ({ tasks, dispatch } : TaskListProps) => {
    console.log(tasks);
    
    const getCategoryName = useMemo(() => (id: Task['category']) => {
        return categories.find((category) => category.id === id)?.label
    }, [])

    return (
        <div className="py-10 space-y-4">
            {tasks.map((task) => (
                <div 
                    key={task.id}
                    className="shadow py-12 px-5 relative flex justify-between items-center">
                    <div 
                        className="absolute top-1 -right-4 text-white font-black w-40 text-center py-2 bg-indigo-500 rounded">
                        { getCategoryName(task.category) }
                    </div>

                    <div className="text-xl">
                        <p className="font-black text-2xl">{ task.name }</p>
                        <p className="text-md">Descripción: { task.description }</p>
                    </div>

                    <div className="flex gap-5">
                        <button
                            onClick={() => dispatch({ type: 'set-task-id', payload: { id: task.id } })}
                        >
                            <PencilIcon className="h-8 w-8 text-blue-700" />
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'remove-task', payload: { id: task.id } })}
                        >
                            <TrashIcon className="h-8 w-8 text-red-700" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
