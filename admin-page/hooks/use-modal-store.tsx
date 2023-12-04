import { create } from 'zustand';

type StoreState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useModalStore = create<StoreState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
