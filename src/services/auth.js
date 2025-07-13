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
  return await apiClient.get("/users/me");
};

// Update user data
export const updateUserData = async (updatedData) => {
  return await apiClient.patch("/users/me", updatedData);
};
