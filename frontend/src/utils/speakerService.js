import axiosInstance from './axiosInstance';

// Public (active speakers only) – GET
export const getPublicSpeakers = () =>
  axiosInstance.get('/api/speakers/');

// Admin CRUD
export const getSpeakers = () =>
  axiosInstance.get('/api/speakers/');

export const getSpeaker = (id) =>
  axiosInstance.get(`/api/speakers/${id}/`);

export const createSpeaker = (formData) =>
  axiosInstance.post('/api/speakers/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateSpeaker = (id, formData) => {
  const config = {};
  if (formData instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return axiosInstance.patch(`/api/speakers/${id}/`, formData, config);
};

export const deleteSpeaker = (id) =>
  axiosInstance.delete(`/api/speakers/${id}/`);