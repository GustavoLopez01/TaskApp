import { useState, ChangeEvent, Dispatch, FormEvent, useEffect } from "react"
import { ActionsTask, TaskAction } from "../reducers/TaskReducer"
import type { Task } from "../types"
import { categories } from "../data"

type FormProps = {
  dispatch: Dispatch<ActionsTask>,
  state: TaskAction
}

const intialState = {
  id: `task-${Date.now()}`,
  name: '',
  description: '',
  category: 1
}

const intialErrorState = {
  name: '',
  description: '',
}

export const Form = ({ dispatch, state } : FormProps) => {

  const [task, setTask] = useState<Task>(intialState)
  const [errors, setErrors] = useState(intialErrorState)

  useEffect(() => {
    if(state.idTask) {
      const selectedTask = state.tasks.filter((task) => task.id === state.idTask)[0]
      setTask(selectedTask)
    }
  }, [state.idTask])

  const handleChange = (e : 
    ChangeEvent<HTMLInputElement> | 
    ChangeEvent<HTMLTextAreaElement> | 
    ChangeEvent<HTMLSelectElement>
  ) => {
    const isCategory = e.target.id === 'category'
    setTask({
      ...task,
      [e.target.id] : isCategory ? +e.target.value : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isSomeFielEmpty: boolean = handleValidate()    
    if(isSomeFielEmpty) return

    dispatch({ type: 'add-task', payload: { task } })
    setTask({
      ...intialState,
      id: `task-${Date.now()}`,
    })
  }

  const handleValidate = () => {
    let isEmptySomeField = false
    let finalErrors = intialErrorState
    for(var [key, value] of Object.entries(task)) {      
      if(!value) {
        finalErrors = {
          ...finalErrors,
          [key] : true
        }
        isEmptySomeField = true
      }
    }
    setErrors(finalErrors)  
    return isEmptySomeField
  }

  return (
    <div className="w-full py-5">
        <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="name">Nombre:</label>
              <input
                className="py-2 px-2 rounded-md outline-none"
                id="name"
                name="name"
                placeholder="Ejemplo: limpiar mi cuarto, realizar mi tarea"
                onChange={handleChange}
                value={task.name}
              />
              { errors['name'] && <span className="font-semibold text-red-600"> El campo nombre no puede estar vacío. </span> }
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="description">Descripción:</label>
              <textarea
                className="py-2 px-2 rounded-md outline-none min-h-11"
                id="description"
                name="description"
                placeholder="Ejemplo: se tiene que barrer y despúes trapear el piso"
                onChange={handleChange}
                value={task.description}
              />
              { errors['description'] && <span className="font-semibold text-red-600"> El campo descripción no puede estar vacío. </span> }
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="category">Categoria</label>
              <select 
                className="py-2 px-2 outline-none"
                id="category" 
                name="category"
                onChange={handleChange}
                value={task.category}
              >
                {categories.map((category) => (
                  <option 
                    key={category.id} 
                    value={category.id}
                    > 
                    { category.label }
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit"
              className="bg-sky-500 text-white font-black w-full py-3 text-2xl rounded-md hover:bg-sky-600"
            >
              { state.idTask ? 'Actualizar' : 'Guardar' }
            </button>
        </form>
    </div>
  )
}
