import { create } from "zustand"

type signInStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSignInStore = create<signInStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
