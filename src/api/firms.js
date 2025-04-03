import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

// ==============================================
// 🏢 1. TÜM AKTİF FİRMALARI GETİR
// Route: GET /api/firms
// ==============================================
export const fetchFirms = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms`);
    return response.data || [];
  } catch (error) {
    console.error("❌ Firma verisi alınırken hata:", error.message);
    return [];
  }
};

// ==============================================
// 🔍 2. TEK BİR FİRMANIN DETAYLARINI GETİR
// Route: GET /api/firms/{firmId}
// ==============================================
export const fetchFirmDetails = async (firmId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms/${firmId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Firma detayları alınamadı:", error.message);
    return {};
  }
};

// ==============================================
// 👤 3. BİR FİRMAYA BAĞLI TÜM ADMİNLERİ GETİR
// Route: GET /api/firms/{firmId}/admins
// ==============================================
export const fetchAdminsByFirmId = async (firmId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/firms/${firmId}/admins`);
    return response.data || [];
  } catch (error) {
    console.error("❌ Admin listesi alınamadı:", error.message);
    return [];
  }
};
