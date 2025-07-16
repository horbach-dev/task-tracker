
import { CloudAlert } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { openCreateCategoryForm } from "@/features/task"

interface IProps {
  projectId: string
}

export function CreateCategoryProject({ projectId }: IProps) {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col w-[230px] items-center">
        <CloudAlert size={64} className="mb-2" />
        <p className="mb-4 text-center">
          В этом проекте еще нет ни одной категории задачи, сначала создайте категорию.
        </p>
        <Button onClick={() => openCreateCategoryForm(projectId)}>
          Добавить категорию задачи
        </Button>
      </div>
    </div>
  )
}