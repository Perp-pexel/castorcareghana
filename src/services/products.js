import { apiClient } from "./config";

// Get all users
export const apiGetUsers = async () => apiClient.get("/users");
export const apiGetAllProducts = async () => apiClient.get("/products");

export const apiPayForProducts = async ({ product, amount, currency, quantity }) => {
  return await apiClient.post('/pay/product', {
    product,
    amount,
    currency,
    quantity,
  });
}