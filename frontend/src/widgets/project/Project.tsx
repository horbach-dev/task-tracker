'use client'

import { projectQueries } from "@/entities/project/api/queries"
import { CreateCategoryProject } from "@/features/project"
import { Loader } from "@/shared/ui/Loader"
import { useQuery } from "@tanstack/react-query"
import { Button } from '@/shared/ui/button'
import { CircleFadingPlus } from "lucide-react"
import { openCreateCategoryForm } from "@/features/task"
import { TaskCategory } from "../task/components/TaskCategory"

interface IProps {
  projectId: string
}

export default function Project ({ projectId }: IProps) {
  const { data, isLoading } = useQuery(projectQueries.project(projectId))

  if (isLoading) {
    return <Loader />
  }

  if (!data?.data?.taskCategories?.length) {
    return (
      <CreateCategoryProject projectId={projectId} />
    )
  }

  return (
    <div  className="w-full h-full overflow-x-auto">
      <div className="flex space-x-4 p-4 items-start min-w-max">
      {data?.data?.taskCategories.map((taskCategory, index) => {
        return (
          <TaskCategory
            key={taskCategory.id}
            projectId={projectId}
            title={taskCategory.title}
            taskList={null}
          />
        )
      })}
      <Button
        variant="outline"
        className="w-[350px] h-20" 
        size='lg'
        onClick={() => openCreateCategoryForm(projectId)}
      >
        <CircleFadingPlus /> Добавить новую колонку
      </Button>
      </div>
    </div>
  )
}