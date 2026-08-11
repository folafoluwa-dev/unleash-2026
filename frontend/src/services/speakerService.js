import axiosInstance from './axiosInstance';

// ─── Admin CRUD ────────────────────────────
export const getSpeakers = () =>
  axiosInstance.get('/api/speakers/').then(res => res.data);  // returns array or { results }

export const getSpeaker = (id) =>
  axiosInstance.get(`/api/speakers/${id}/`).then(res => res.data);

export const createSpeaker = (formData) =>
  axiosInstance.post('/api/speakers/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const updateSpeaker = (id, formData) => {
  // formData can be a plain object (JSON) or FormData (for file upload)
  const config = {};
  if (formData instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return axiosInstance.patch(`/api/speakers/${id}/`, formData, config).then(res => res.data);
};

export const deleteSpeaker = (id) =>
  axiosInstance.delete(`/api/speakers/${id}/`).then(res => res.data);

// ─── Public (no auth) ─────────────────────
export const getPublicSpeakers = () =>
  axiosInstance.get('/api/speakers/');  // same endpoint, but backend filters active for anonymous users