import { User } from "@/constants/types";
import { create } from "zustand";

interface GlobalState {
  user: User | null;
  setUser: (payload: User) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  user: null,
  setUser: (payload) => set(() => ({ user: payload })),
}));
