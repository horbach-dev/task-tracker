import { axiosWithAuth } from "@/shared/api/interceptors";
import { TProjectCreateDto, IProjectResponse } from "./types";

export const projectService = {
  async create (data: TProjectCreateDto) {
    const response = await axiosWithAuth.post<IProjectResponse>('/project', data)
    return response
  },
  async getAll () {
    const response = await axiosWithAuth.get<IProjectResponse[]>('/project')
    return response
  },
  async getProjectById (id: string) {
    const response = await axiosWithAuth.get<IProjectResponse>(`/project/${id}`)
    return response
  },
}