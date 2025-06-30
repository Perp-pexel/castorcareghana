import { apiClient } from "./config";

export const apiSignup = async (payload) => {
  return await apiClient.post("/users/register", payload);
};

export const apiLogin = async (payload) => {
  return apiClient.post("/users/login", payload);
};

export const getUserData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  return await apiClient.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
