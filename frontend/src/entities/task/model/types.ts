export interface ITask {
  id: string
  title: string
  description: string
  order: number
  priority: string
  createdAt: string
  updatedAt: string
}

export interface ITaskCategory {
  id: string
  title: string
  projectId: string
}