import { useState } from "react"
import { ModalNewTask } from "./components/ModalNewTask"
import { TaskList } from "./components/TaskList"

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  return (
    <div className={`w-screen h-screen ${showModal && 'bg-gray-300'}`}>
      <TaskList 
        setTasks={setTasks}
        tasks={tasks}
        setShowModal={setShowModal}
      />
      <div className="flex justify-center">
        <ModalNewTask
          setShowModal={setShowModal}
          showModal={showModal}
          setTasks={setTasks}
        />
      </div>
    </div>
  )
}

export default App
