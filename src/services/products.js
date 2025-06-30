import { apiClient } from "./config";

// Get all users
export const apiGetUsers = async () => apiClient.get("/users");
export const apiGetAllProducts = async () => apiClient.get("/products");