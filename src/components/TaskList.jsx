import PropTypes from "prop-types";

export const TaskList = ({ setShowModal = () => {}, setTasks = () => {}, tasks = [] }) => {

    // Update tasks if is finish
    const handleChangeTask = (idTask, isFinish) => {
        const updateTasks = tasks.map((task) => {
            if(task.id === parseFloat(idTask)) {
                return {
                    ...task,
                    isFinish
                }
            }

            return task;
        });
        setTasks(updateTasks);
    }

    const formatDate = (date) => {
        return date.toLocaleDateString("en-GB")
    }

  return (
    <div className="pt-24" style={{ animation: "fadein .5s" }}>
        <h3 className="text-xl text-red-600 font-bold mb-2 text-center uppercase">
            { tasks.length > 0 ? 'Task list' : 'There is not tasks' }
        </h3>
        { tasks.length > 0 && (
        <div className="w-full flex justify-center">
            <div className="shadow-lg min-w-96 w-2/4 rounded-lg min-h-32 overflow-auto">
                <div className="flex flex-col divide-y">
                    { tasks.map((task, index) => {
                            return (
                                <div key={index} >
                                    <div className="flex justify-between">
                                        <div className="h-20 flex flex-col m-5 mb-0">
                                        <span className={`text-md font-bold uppercase ${task.isFinish && 'line-through'}`}>Title: <span className="font-light">{task.title}</span></span>
                                        <span className={`text-md font-bold uppercase ${task.isFinish && 'line-through'}`}>Description: <span className="font-light">{task.description}</span></span>
                                        <span className={`text-md font-bold uppercase ${task.isFinish && 'line-through'}`}>Created: <span className="font-light">{formatDate(task.date)}</span></span>
                                        </div>
                                            <input 
                                            type="checkbox" 
                                            className="mr-10"
                                            checked={task.isFinish}
                                            value={task.id}
                                            onChange={({ target }) => {
                                                handleChangeTask(target.value, target.checked);
                                            }}
                                            />
                                    </div>
                                </div>
                        )})}
                </div>
            </div>
        </div>
        )}
        <div className="flex justify-center mt-5">
            <button 
                onClick={() => setShowModal(true)} 
                className="bg-red-500 hover:bg-red-600 w-96 h-12 font-bold rounded-xl text-white">Add Task</button>
        </div>
    </div>
  )
}

TaskList.propTypes = {
    tasks: PropTypes.array,
    setShowModal: PropTypes.func,
    setTasks: PropTypes.func
}