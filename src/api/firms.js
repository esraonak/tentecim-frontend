import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * 🏢 Tüm firmaları getirir (active olanlar).
 */
export const fetchFirms = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms`);
    return response.data || [];
  } catch (error) {
    console.error("Firma verisi alınırken hata:", error);
    return [];
  }
};

/**
 * 🔍 Tek bir firmanın detay bilgilerini getirir.
 */
export const fetchFirmDetails = async (firmId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms/${firmId}`);
    return response.data;
  } catch (error) {
    console.error("Firma detayları alınamadı:", error);
    return {};
  }
};

/**
 * 👤 Belirli bir firmaya bağlı admin listesini getirir.
 */
export const fetchAdminsByFirmId = async (firmId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms/${firmId}/admins`);
    return response.data || [];
  } catch (error) {
    console.error("Admin listesi alınamadı:", error);
    return [];
  }
};
