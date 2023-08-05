import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TUser } from './types/user.type'

export const UserStore = create<TUser>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (data: string | null) => {
        set({ accessToken: data })
      },
    }),
    {
      name: 'user',
      getStorage: () => sessionStorage,
    }
  )
)
