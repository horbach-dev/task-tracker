import { queryOptions } from '@tanstack/react-query'
import { projectService } from './service'

export const projectQueries = {
  projectsKey: () => ['projects'] as const,
  projects: () =>
    queryOptions({
      queryKey: projectQueries.projectsKey(),
      queryFn: projectService.getAll
    }),
  project: (id: string) =>
    queryOptions({
      queryKey: [...projectQueries.projectsKey(), id],
      queryFn: () => projectService.getProjectById(id),
      enabled: !!id
    })
}