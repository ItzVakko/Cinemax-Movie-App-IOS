export const USER_CONFIG = {
  BASE_URL: "http://192.168.10.106:3000/api/v1/user",
};

export const fetchUserData = async (token) => {
  const endpoint = "/me";

  const response = await fetch(`${USER_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Error("failed to fetch user data!", response.statusText);

  const data = await response.json();

  return data;
};
