import { create } from "zustand";
import { User } from "@prisma/client";
import { getUser } from "../app/actions/user";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getUser();
      // console.log('Fetched user:', user)
      set({ user, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
}));
