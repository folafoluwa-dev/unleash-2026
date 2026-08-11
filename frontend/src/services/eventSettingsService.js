import axiosInstance from './axiosInstance';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// Public (no auth) – GET event settings
export const getEventSettings = async () => {
  // Use axios without auth token to allow public access
  const response = await axios.get(`${API_BASE}/api/event-settings/`);
  return response.data;
};

// Admin (authenticated) – PATCH event settings
export const updateEventSettings = async (data) => {
  const response = await axiosInstance.patch('/api/event-settings/', data);
  return response.data;
};