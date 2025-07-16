import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { projectService } from '@/entities/project'
import { projectQueries } from '@/entities/project/api/queries'

export function useAddProject ({ resetForm }: { resetForm: () => void }) {
  const router = useRouter()

  return useMutation({
    mutationFn: projectService.create,
    meta: {
      invalidates: [projectQueries.projectsKey()],
      errorMessage:
        'Пожалуйста повторите попытку'
    },
    onSuccess(data) {
      resetForm()

      if (data?.data) {
        router.push(`/main/${data.data.id}`)
      }
    }
  })
}