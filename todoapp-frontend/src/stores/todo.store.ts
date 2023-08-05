import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TTodo } from './types/todo.type'

export const TodoStore = create<TTodo>()(
  persist(
    (set, get) => ({
      modalVisible: false,
      setModalVisible: (visible: boolean) => {
        set({ modalVisible: visible })
      },
      modalDeleteVisible: false,
      setModalDeleteVisible: (modalDeleteVisible: boolean) => {
        set({ modalDeleteVisible: modalDeleteVisible })
      },
    }),
    {
      name: 'todo',
    }
  )
)
