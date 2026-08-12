import axiosInstance from './axiosInstance';

// Public – create a message (no auth)
export const createMessage = async (data) => {
  const response = await axiosInstance.post('/api/messages/', data);
  return response.data;
};

// Admin – list all messages
export const getMessages = async () => {
  const response = await axiosInstance.get('/api/messages/');
  return response.data;   // array or { results: [...] }
};

// Admin – get single message
export const getMessage = async (id) => {
  const response = await axiosInstance.get(`/api/messages/${id}/`);
  return response.data;
};

// Admin – update message (status)
export const updateMessage = async (id, data) => {
  const response = await axiosInstance.patch(`/api/messages/${id}/`, data);
  return response.data;
};

// Admin – delete message
export const deleteMessage = async (id) => {
  await axiosInstance.delete(`/api/messages/${id}/`);
};