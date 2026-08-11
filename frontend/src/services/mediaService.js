import axiosInstance from './axiosInstance';

// Admin (authenticated) & public (no auth) list
export const getMedia = () =>
  axiosInstance.get('/api/media/').then(res => res.data);   // returns array or { results }

export const getMediaItem = (id) =>
  axiosInstance.get(`/api/media/${id}/`).then(res => res.data);

export const createMedia = (formData) =>
  axiosInstance.post('/api/media/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const updateMedia = (id, formData) => {
  const config = {};
  if (formData instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return axiosInstance.patch(`/api/media/${id}/`, formData, config).then(res => res.data);
};

export const deleteMedia = (id) =>
  axiosInstance.delete(`/api/media/${id}/`).then(res => res.data);

// Public (no auth required) – same GET endpoint returns active items only
export const getPublicMedia = () =>
  axiosInstance.get('/api/media/');   // Backend serves active only for anonymous