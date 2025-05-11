import { create } from "zustand";
import { clearAuthData, getAuthData, saveAuthData } from "../utils/storage";
import { fetchUserData } from "../services/userApi";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (userData, token) => {
    try {
      const userAdditionalData = await fetchUserData(token);
      const mergedUserData = { ...userData, ...userAdditionalData };

      await saveAuthData(token, mergedUserData);

      set({ isLoggedIn: true, user: mergedUserData, token });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      await saveAuthData(token, userData);
      set({ isLoggedIn: true, user: userData, token });
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

  dataUpdate: async () => {
    const { token } = await getAuthData();

    if (token) {
      try {
        const userAdditionalData = await fetchUserData(token);
        const currentUser = useAuthStore.getState().user || {};
        const mergedUserData = { ...currentUser, ...userAdditionalData };

        await saveAuthData(token, mergedUserData);
        set({ user: mergedUserData });
      } catch (error) {
        console.error("Failed to renew user data:", error);
      }
    }
  },
}));

export default useAuthStore;
