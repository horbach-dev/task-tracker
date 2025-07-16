export interface ICreateTask {
  title: string
  description?: string
  order?: number
  priority?: string
}

export interface ICreateTaskCategory {
  title: string
  projectId: string
}