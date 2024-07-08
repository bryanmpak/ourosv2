import { create } from "zustand"

type accountLinkStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAccountLinkStore = create<accountLinkStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
