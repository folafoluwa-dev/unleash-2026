import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  const response = await axios.post(`${API_BASE}/api/auth/token/`, {
    username,
    password,
  });
  return response.data; // { access, refresh }
}

export async function refreshToken(token) {
  const response = await axios.post(`${API_BASE}/api/auth/token/refresh/`, {
    refresh: token,
  });
  return response.data.access;
}