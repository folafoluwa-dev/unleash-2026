import axiosInstance from './axiosInstance';
import axios from 'axios';
// Admin (authenticated) & public (no auth) list
export const getMedia = () =>
  axiosInstance.get('/api/gallery/').then(res => res.data);   // returns array or { results }

export const getMediaItem = (id) =>
  axiosInstance.get(`/api/gallery/${id}/`).then(res => res.data);

export const createMedia = (formData) =>
  axiosInstance.post('/api/gallery/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const updateMedia = (id, formData) => {
  const config = {};
  if (formData instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return axiosInstance.patch(`/api/gallery/${id}/`, formData, config).then(res => res.data);
};

export const deleteMedia = (id) =>
  axiosInstance.delete(`/api/gallery/${id}/`).then(res => res.data);

// Public (no auth required) – same GET endpoint returns active items only
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getPublicMedia = async () => {
  const response = await axios.get(`${API_BASE}/api/gallery/`);
  return response.data; // <--- Make sure response.data is returned!
};