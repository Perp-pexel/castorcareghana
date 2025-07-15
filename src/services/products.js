
import { apiClient } from "./config";

// Get all users
export const apiGetUsers = async () => apiClient.get("/users");


//products
export const apiPostProducts = async (formData) =>
  apiClient.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const apiGetAllProducts = async () => {
  return apiClient.get('/products');
};

export const apiGetUserProducts = async () => {
  return await apiClient.get("/users/me/products");
};

export const apiUpdateProduct = async (id, payload) => {
  return apiClient.patch(`/products/${id}`, payload);
};
export const apiGetFarmerProducts = async (farmerId) =>
  apiClient.get(`/products/${farmerId}`);
export const apiPayForProducts = async ({ product, amount, currency, quantity }) => {
  return await apiClient.post('/pay/product', {  product, amount, currency, quantity,});
}
export const apiDeleteProduct = async (id) => {
  return apiClient.delete(`/products/${id}`);
};
//reviews
export const apiGetReviews = async (farmerId) => apiClient.get(`/reviews/${farmerId}`);
export const apiGetAllReviews = async () => apiClient.get("/reviews");
export const apiCreateReview = (reviewData) => apiClient.post('/reviews', reviewData);
export const apiDeleteReview = (reviewId) => apiClient.delete(`/reviews/${reviewId}`);
export const apiUpdateReview = (reviewId, updatedData) => apiClient.patch(`/reviews/${reviewId}`, updatedData);
export const apiGetUserReviews = async (buyerId) => apiClient.get(`/reviews/${buyerId}`);


//educations
export const apiGetEducations = async () => apiClient.get("/educations")
export const apiUpdateEducations = async (id, payload) =>
  apiClient.patch(`/educations/${id}`, payload);

export const apiDeleteEducations = async (id) =>
  apiClient.delete(`/educations/${id}`);

export const apiCreateEducations = async (formData) => {
  return apiClient.post('/educations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const apiPayForEducation = async ({ education, amount, currency }) => {
  return await apiClient.post('/pay/education', {
    education,
    amount,
    currency,
  });
};






