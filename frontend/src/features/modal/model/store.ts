import { create } from 'zustand';

type Modal = {
  id: string
  header?: {
    title?: string
    description?: string
  },
  content: React.ReactNode
  footer: React.ReactNode
}

interface ModalStore {
  queue: Modal[];
  current: Modal | null;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  queue: [],
  current: null,
  openModal: (modal) =>
    set((state) => {
      if (state.current) {
        return { queue: [...state.queue, modal] };
      }
      return { current: modal };
    }),
  closeModal: () =>
    set((state) => {
      const next = state.queue[0] || null;
      return {
        current: next,
        queue: state.queue.slice(1),
      };
    }),
  closeAll: () => set({ queue: [], current: null }),
}));
