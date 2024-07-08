import { create } from "zustand"

type accountLinkStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAccountLink = create<accountLinkStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
