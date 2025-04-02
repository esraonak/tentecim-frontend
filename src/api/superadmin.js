// src/api/superadmin.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE}/api/superadmin/stats`);
  return response.data;
};
