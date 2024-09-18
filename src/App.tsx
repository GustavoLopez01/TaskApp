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
      <Header />
      <section className="bg-slate-100">
        <div className="max-w-4xl mx-auto flex justify-center">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <TaskList
          dispatch={dispatch}
          tasks={state.tasks}
        />
      </section>
    </>
  )
}

export default App
