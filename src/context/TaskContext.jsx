import { useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest } from "../api/task";
import { TaskContext } from "./useTaskContext";
import PropTypes from 'prop-types';


export const TaskProvider = ({children}) => {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            console.log(res)
            setTasks(res.data)
            console.log(tasks)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
            await getTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            await getTasks()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        const res = await deleteTaskRequest(id)
        if(res.status === 204) setTasks(tasks.filter( taskActual => taskActual._id !== id))
    }
    return(
        <TaskContext.Provider value={{tasks, setTasks, getTasks, createTask,updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
}