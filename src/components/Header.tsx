import { Dispatch } from "react"
import { ActionsTask } from "../reducers/TaskReducer"

type HeaderProps = {
  dispatch: Dispatch<ActionsTask>
}

export const Header = ({ dispatch } : HeaderProps) => {
  return (
    <header className="bg-sky-700 py-5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-center uppercase font-black text-2xl">Task app</h1>
          <button 
            className="text-white font-black bg-transparent px-10 py-3 rounded-full uppercase border border-slate-800 shadow-md hover:bg-sky-800"
            onClick={() => dispatch({ type: 'clean-tasks' })}
            >Reiniciar app</button>
        </div>
    </header>
  )
}
