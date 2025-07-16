import { ITaskCategory } from '@/entities/task/model/types'

export interface IProjectResponse {
  createdAt: string
  description: string
  id: string
  title: string
  taskCategories?: ITaskCategory[]
}

export interface TProjectCreateDto {
  title: string
  description: string
}