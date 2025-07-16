import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { sessionService } from '@/entities/session'
import { useSessionStore } from '@/entities/session'

export const useLogin = (resetForm: () => void) => {
  const router = useRouter()
  const { setUser } = useSessionStore()

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: sessionService.login,
    onSuccess(data) {
      resetForm()

      if (data?.data?.user) {
        setUser(data.data.user)
        router.push('/main')
      }
    }
  })

  return { isPending, login: mutate }
}