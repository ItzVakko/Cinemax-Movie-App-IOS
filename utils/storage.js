import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthData = async (token, user) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    await AsyncStorage.setItem("authUser", JSON.stringify(user));
  } catch (err) {
    console.log("Error saving auth data: ", err);
  }
};

export const getAuthData = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const user = await AsyncStorage.getItem("authUser");
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch (err) {
    console.log("Error getting auth data: ", err);
    return { token: null, user: null };
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("authUser");
  } catch (err) {
    console.log("Error clearing auth data: ", err);
  }
};
