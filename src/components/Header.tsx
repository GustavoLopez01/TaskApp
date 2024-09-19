import { Dispatch, useMemo } from "react"
import { ActionsTask } from "../reducers/TaskReducer"
import { Task } from "../types"

type HeaderProps = {
  dispatch: Dispatch<ActionsTask>,
  tasks: Task[]
}

export const Header = ({ dispatch, tasks } : HeaderProps) => {

  const isEmptyTaskList = useMemo(() => tasks.length > 0 ,[tasks])

  return (
    <header className="bg-sky-700 py-5 sm:px-10 max-[640px]:px-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center max-[470px]:flex-col max-[470px]:gap-2">
          <h1 className="text-white text-center uppercase font-black text-2xl">Task app</h1>
          <button 
            className="text-white font-black bg-transparent px-10 py-3 rounded-full uppercase border disabled:opacity-80 disabled:cursor-not-allowed border-slate-800 shadow-md hover:bg-sky-800"
            onClick={() => dispatch({ type: 'clean-tasks' })}
            disabled={!isEmptyTaskList}
            >Reiniciar app</button>
        </div>
    </header>
  )
}
