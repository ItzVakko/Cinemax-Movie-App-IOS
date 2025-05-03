import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (userData, token) => set({ isLoggedIn: true, user: userData, token }),
  logout: () => set({ isLoggedIn: false, user: null, token: null }),
}));

export default useAuthStore;
