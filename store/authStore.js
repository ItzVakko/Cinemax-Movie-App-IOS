import { create } from "zustand";
import { clearAuthData, getAuthData, saveAuthData } from "../utils/storage";
import { fetchUserData } from "../services/userApi";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (userData, token) => {
    await saveAuthData(token, userData);
    set({ isLoggedIn: true, user: userData, token });

    try {
      const userAdditionalData = await fetchUserData(token);
      set({ user: { ...userData, ...userAdditionalData } });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  },

  logout: async () => {
    await clearAuthData();
    set({ isLoggedIn: false, user: null, token: null });
  },

  loadStoredAuth: async () => {
    const { token, user } = await getAuthData();

    if (token && user) {
      set({ isLoggedIn: true, user, token });
    } else {
      set({ isLoggedIn: false, user: null, token: null });
    }
  },
}));

export default useAuthStore;
