// 📁 src/api/superadmin.js
import axios from 'axios';

// 🌍 Backend API ana adresi (.env'den geliyor)
const API_BASE = process.env.REACT_APP_API_BASE;

// ✅ Dashboard sayıları çekme
export const getDashboardStats = async () => {
  const response = await axios.get(`${API_BASE}/api/superadmin/stats`);
  return response.data;
};

// ✅ Onay bekleyen kullanıcıları çek
export const getPendingUsers = async () => {
  const response = await axios.get(`${API_BASE}/api/superadmin/pending-users`);
  return response.data;
};

// ✅ Kullanıcıyı onayla
export const approvePendingUser = async (id) => {
  const response = await axios.post(`${API_BASE}/api/superadmin/approve/${id}`);
  return response.data;
};

// ✅ Kullanıcıyı reddet (sil)
export const rejectPendingUser = async (id) => {
  const response = await axios.delete(`${API_BASE}/api/superadmin/pending-users/${id}`);
  return response.data;
};
