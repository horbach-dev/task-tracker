import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { sessionService } from '../api/services'
import type { IUser } from './types'

type TSessionState = {
  user: IUser
  isLoading: boolean
  setUser: (data: IUser) => void
  logout: () => Promise<boolean | void>
  getCurrentUser: () => void
  updateUser: (updater: (user: IUser) => void) => void
}

const defaultState: IUser = {
  id: '',
  name: '',
  avatar: '',
  email: '',
  createdAt: '',
  updatedAt: '',
}

export const useSessionStore = create<TSessionState>()(
  devtools(
    immer(set => ({
      isLoading: false,
      user: defaultState,
      setUser: (data: IUser) => {
        set(state => {
          Object.assign(state.user, data)
        }, false, 'user/setUser')
      },
      updateUser: updater => {
        set(state => updater(state.user as IUser), false, 'user/setUser')
      },
      getCurrentUser: async () => {
        set(state => {
          state.isLoading = true
        }, false, 'user/isLoading')

        sessionService.getUserData().then(response => {
          if (response?.data?.id) {
            set(state => {
              Object.assign(state.user, response.data)
            }, false, 'user/getCurrentUser')
          }
        }).finally(() => {
          set(state => {
            state.isLoading = false
          }, false, 'user/isLoading')
        })
        
      },
      logout: async () => {
        return sessionService.logout().then(res => {
          if (res.data) {
            set(state => {
              Object.assign(state.user, defaultState)
            }, false, 'user/logout')
          }

          return res.data
        })
      }
    })),
    {
      name: 'user-storage',
    },
  )
)

