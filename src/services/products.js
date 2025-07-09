import { apiClient } from "./config";

// Get all users
export const apiGetUsers = async () => apiClient.get("/users");
export const apiGetAllProducts = async () => apiClient.get("/products");
export const apiGetFarmerProducts = async (farmerId) =>
  apiClient.get(`/products/${farmerId}`);
export const apiPayForProducts = async ({ product, amount, currency, quantity }) => {
  return await apiClient.post('/pay/product', {
    product,
    amount,
    currency,
    quantity,
  });
}

//reviews
export const apiGetReviews = async (farmerId) => apiClient.get(`/reviews/${farmerId}`);
export const apiGetAllReviews = async () => apiClient.get("/reviews");



//educations
export const apiGetEducations = async () => apiClient.get("/educations")
export const apiPayForEducation = async ({ education, amount, currency }) => {
  return await apiClient.post('/pay/education', {
    education,
    amount,
    currency,
  });
};






