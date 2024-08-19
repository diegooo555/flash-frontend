import axios from "./axiosInstance";


export const getTaskRequest = async (id) => axios.get(`/task/${id}`)

export const getTasksRequest = async () => axios.get('/tasks');

export const createTaskRequest = (task) => axios.post('/tasks', task);

export const updateTaskRequest = async (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`task/${id}`)