import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { taskService } from '@/entities/task'
import { useModalStore } from '@/features/modal'

export function useCreateTaskCategory(resetForm: () => void) {
  const { closeModal } = useModalStore()

  const { mutate, isPending } = useMutation({
    mutationKey: ['task'],
    mutationFn: taskService.createTaskCategory,
    onSuccess() {
      resetForm()
      closeModal()
    }
  })

  return { isPending, create: mutate }
}