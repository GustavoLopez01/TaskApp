import { useState } from "react"


export const ModalNewTask = ({ showModal, setShowModal, setTasks }) => {

    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const handleAddTask = () => {
        const newTask = {
            ...task,
            date: new Date(),
            id: Date.now() + Math.random() * 100,
            isFinish: false
        }

        setTasks((tasks) => [...tasks, newTask]);
        handleCleanTask();
    }

    const handleCleanTask = () => {
        setShowModal(false);
        setTask({
            title: "",
            description: ""
        });
    }

  return (
    <div className={`flex justify-center fixed top-24 ${!showModal && 'hidden'}`}>
        <div className="bg-white shadow-xl w-96 h-96 rounded-xl border-2">
            <div className="text-center mt-2 flex">
                <span className="text-md font-bold uppercase w-full">Register a new Task</span>
            </div>
            <hr />
            <div className="mt-10 flex flex-col">
                <div className="flex flex-col m-10 mt-0">
                    <label htmlFor="name" className="pl-1 font-bold">Name:</label>
                    <input 
                        type="text"
                        id="name" 
                        name="name"
                        value={task.title}
                        className="border-2 rounded-full outline-none pl-2"
                        onChange={({ target }) => setTask({...task, title: target.value})}
                        />
                </div>

                <div className="flex flex-col m-10 mt-0">
                    <label htmlFor="description" className="pl-1 font-bold">Description:</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description"
                        value={task.description}
                        className="border-2 rounded-full outline-none pl-2"
                        onChange={({ target }) => setTask({...task, description: target.value})}
                        />
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    className="font-bold bg-orange-600 hover:bg-orange-700 text-white w-36 h-10 rounded-md mr-3"
                    onClick={handleAddTask}>Save task</button>
                <button 
                    className="font-bold bg-gray-500 hover:bg-gray-600 text-white w-36 h-10 rounded-md ml-3"
                    onClick={handleCleanTask}>Close</button>
            </div>
        </div>
    </div>
  )
}
