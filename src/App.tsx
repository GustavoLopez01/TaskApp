import { useEffect, useReducer } from "react"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { TaskList } from "./components/TaskList"
import { TaskReducer, intialState } from "./reducers/TaskReducer"

function App() {

  const [state, dispatch] = useReducer(TaskReducer, intialState)

  useEffect(() => {
    if(state.tasks) {
      sessionStorage.setItem("tasks", JSON.stringify(state.tasks))
    }
  }, [state.tasks])

  return (
    <>
      <Header dispatch={dispatch} tasks={state.tasks} />
      <section className="bg-slate-100 sm:px-10 max-[640px]:px-10">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto sm:px-10 max-[640px]:px-10">
        <TaskList
          dispatch={dispatch}
          tasks={state.tasks}
        />
      </section>
    </>
  )
}

export default App
