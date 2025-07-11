import { apiClient } from "./config";

// Signup
export const apiSignup = async (payload) => {
  return await apiClient.post("/users/register", payload);
};

// Login
export const apiLogin = async (payload) => {
  return apiClient.post("/users/login", payload);
};

// Get user data
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

// Update user data
export const updateUserData = async (updatedData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  return await apiClient.patch("/users/me", updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



