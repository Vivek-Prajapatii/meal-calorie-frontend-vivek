import { create } from "zustand";

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: '',
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: '' }),
}));
