import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const getRawBase = () => API_URL.replace(/\/api$/, "");

export const cardsApi = {
  getAll: () => api.get("/cards"),
  getOne: (id) => api.get(`/cards/${id}`),
  create: (data) => api.post("/cards", data),
  update: (id, data) => api.put(`/cards/${id}`, data),
  remove: (id) => api.delete(`/cards/${id}`),
  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const resolveImageUrl = (imageUrl) => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http") || imageUrl.startsWith("data:")) return imageUrl;
  return `${getRawBase()}${imageUrl}`;
};
