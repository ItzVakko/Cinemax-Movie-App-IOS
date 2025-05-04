import { create } from "zustand";
import { clearAuthData, getAuthData, saveAuthData } from "../utils/storage";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (userData, token) => {
    await saveAuthData(token, userData);
    set({ isLoggedIn: true, user: userData, token });
  },
  logout: async () => {
    await clearAuthData();
    set({ isLoggedIn: false, user: null, token: null });
  },

  loadStoredAuth: async () => {
    const { token, user } = await getAuthData();
    if (token && user) {
      set({ isLoggedIn: true, token, user });
    }
  },
}));

export default useAuthStore;
