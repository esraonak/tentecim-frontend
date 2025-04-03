// 📁 src/api/pendingUsers.js

import axios from 'axios';

// 🌍 .env.local içinden gelen API adresi
const API_BASE = process.env.REACT_APP_API_BASE;

// ✅ 1. Onay bekleyen kullanıcıları getirir
export const getPendingUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/superadmin/pending-users`);
    return response.data; // 🔁 API'den gelen kullanıcı listesi döndürülür
  } catch (error) {
    console.error("Pending kullanıcılar alınamadı:", error);
    throw error; // 🛑 Hata varsa fırlatılır, frontend'de yakalanır
  }
};

// ✅ 2. Kullanıcıyı reddetmek (silmek) için API çağrısı
export const deletePendingUser = async (id) => {
  try {
    await axios.delete(`${API_BASE}/api/superadmin/pending-users/${id}`);
    console.log("❌ Kullanıcı başarıyla silindi:", id);
  } catch (error) {
    console.error("Kullanıcı silinemedi:", error);
    throw error;
  }
};
