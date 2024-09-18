import type { Task } from "../types"

// Actions
export type ActionsTask = 
    { type: 'add-task', payload: { task: Task } } |
    { type: 'set-task-id', payload: { id: Task['id'] } } |
    { type: 'remove-task', payload: { id : Task['id'] } }

// Type state
export type TaskAction = {
    tasks: Task[],
    idTask: Task['id']
}

const handleGetSessionStorageTasks = () => {
    const tasks = sessionStorage.getItem("tasks")
    return tasks ? JSON.parse(tasks) : []
}

export const intialState : TaskAction = {
    tasks: handleGetSessionStorageTasks(),
    idTask: ''
}

export const TaskReducer = (
    state: TaskAction = intialState,
    action: ActionsTask
) => {

    switch(action.type) {
        case 'add-task':
            let updatedTasks : Task[] = []
            
            if(state.idTask) {
                updatedTasks = state.tasks.map((task) => task.id === state.idTask 
                ? action.payload.task : task )
            } else {
                updatedTasks = [...state.tasks, action.payload.task]
            }

            return {
                ...state,
                tasks: updatedTasks,
                idTask: ''
            }
        case 'set-task-id':
            return {
                ...state,
                idTask: action.payload.id
            }
        case 'remove-task':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
                idTask: ''
            }
    }

}  