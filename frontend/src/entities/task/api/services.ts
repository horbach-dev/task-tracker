import { axiosWithAuth } from "@/shared/api/interceptors";
import { ICreateTask, ICreateTaskCategory } from "./types";
import { ITask, ITaskCategory } from "../model/types";

export const taskService = {
  async getAllTasks () {
    const response = await axiosWithAuth.get<ITask[]>('/tasks')
    return response.data
  },
  async createTaskCategory (data: ICreateTaskCategory) {
    const response = await axiosWithAuth.post<ITaskCategory>('/tasks/category', data)
    return response.data
  },
  async createTask (data: ICreateTask) {
    const response = await axiosWithAuth.post<ITask[]>('/tasks', data)
    return response.data
  },
  async updateTask (id: string, data: ICreateTask) {
    const response = await axiosWithAuth.put<ITask[]>(`/tasks/${id}`, data)
    return response.data
  },
  async removeTask (id: string) {
    const response = await axiosWithAuth.delete(`/tasks/${id}`)
    return response.data
  },
}