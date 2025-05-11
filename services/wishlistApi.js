const WISHLIST_CONFIG = {
  BASE_URL: "http://192.168.10.106:3000/api/v1/user/wishlist",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchAddWishlist = async (movieId, token) => {
  const endpoint = "/add";

  const response = await fetch(`${WISHLIST_CONFIG.BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { ...WISHLIST_CONFIG.headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ movieId }),
  });

  if (!response.ok) throw new Error("failed to add wishlist");

  const data = await response.json();

  return data;
};

export const fetchRemoveWishlist = async (movieId, token) => {
  const endpoint = `/remove/${movieId}`;

  const response = await fetch(`${WISHLIST_CONFIG.BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { ...WISHLIST_CONFIG.headers, Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("failed to remove wishlist");

  const data = await response.json();

  return data;
};
