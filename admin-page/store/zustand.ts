import { create } from 'zustand';

type CreateStoreStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateStoreModalStore = create<CreateStoreStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
