// 📁 src/api/superadmin.js
import axios from 'axios';

// 🌍 Backend API ana adresi (.env'den geliyor)
const API_BASE = process.env.REACT_APP_API_BASE;

// ✅ Dashboard sayıları (mevcutsa)
export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE}/api/superadmin/stats`);
  return response.data;
};

// ✅ Bekleyen kullanıcıları çek
export const getPendingUsers = async () => {
  const response = await axios.get(`${API_BASE}/api/superadmin/pending-users`);
  return response.data;
};

// ✅ Kullanıcıyı reddet (DELETE)
export const deletePendingUser = async (id) => {
  await axios.delete(`${API_BASE}/api/superadmin/pending-users/${id}`);
};

// ✅ Kullanıcıyı onayla (POST)
export const approvePendingUser = async (id) => {
  await axios.post(`${API_BASE}/api/superadmin/approve-user/${id}`);
};