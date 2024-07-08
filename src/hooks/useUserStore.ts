import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserStore = {
  user: string | null
  setUser: (user: string | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: "Guest", // Initialize user state to "Guest"
      setUser: (user) => set({ user }),
    }),
    {
      name: "user", // Key to store in localStorage
    }
  )
)
