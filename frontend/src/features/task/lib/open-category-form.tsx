import { showModal } from "@/features/modal/lib/show-modal"
import { CreateTaskCategoryForm } from "../components/CreateTaskCategoryForm"

export function openCreateCategoryForm(projectId: string) {
  showModal({ 
    header: { title: 'Создание новой колонки' },
    content: <CreateTaskCategoryForm projectId={projectId} />
  })
}