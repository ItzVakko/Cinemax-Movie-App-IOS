export const AUTH_CONFIG = {
  BASE_URL: "http://192.168.10.106:3000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchRegister = async (userData) => {
  const endpoint = "/register";

  const response = await fetch(`${AUTH_CONFIG.BASE_URL}${endpoint}`, {
    method: "POST",
    headers: AUTH_CONFIG.headers,
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("failed to register");

  const data = await response.json();

  return data;
};

export const fetchLogin = async (userData) => {
  const endpoint = "/login";

  const response = await fetch(`${AUTH_CONFIG.BASE_URL}${endpoint}`, {
    method: "POST",
    headers: AUTH_CONFIG.headers,
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("failed to login");

  const data = await response.json();

  return data;
};
