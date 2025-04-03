import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

// ================================================
// 📩 1. E-POSTA KODU GÖNDERME
// Route: POST /api/email/sendcode
// ================================================
export const sendVerificationCode = async (email, firmId) => {
  try {
    const response = await fetch(`${API_BASE}/api/email/sendcode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firmId }),
    });

    const contentType = response.headers.get("content-type");
    const result = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return { ok: response.ok, result };
  } catch (error) {
    return {
      ok: false,
      result: "İstek sırasında bir hata oluştu: " + error.message,
    };
  }
};

// ================================================
// ✅ 2. E-POSTA KODU DOĞRULAMA
// Route: POST /api/email/verify
// ================================================
export const verifyCode = async (email, code) => {
  try {
    const response = await fetch(`${API_BASE}/api/email/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const result = await response.text();
    return { ok: response.ok, result };
  } catch (error) {
    return {
      ok: false,
      result: "Doğrulama isteği başarısız: " + error.message,
    };
  }
};

// ================================================
// 📝 3. KULLANICI KAYDI (Admin veya User)
// Route: POST /api/auth/register
// ================================================
export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/register`, payload);
    return response.data;
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      "Sunucu hatası oluştu.";
    throw new Error(msg);
  }
};

// ================================================
// 🔐 4. GİRİŞ METOTLARI (SuperAdmin, Admin, User)
// Route: POST /api/superadmin/login
// ================================================

// ✅ SuperAdmin Girişi
export const loginSuperAdmin = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/superadmin/login`, {
    email,
    password,
    rememberMe,
    deviceToken,
  });
  return response.data;
};

// ✅ Admin Girişi
export const loginAdmin = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/admin/login`, {
    email,
    password,
    rememberMe,
    deviceToken,
  });
  return response.data;
};

// ✅ User Girişi
export const loginUser = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/user/login`, {
    email,
    password,
    rememberMe,
    deviceToken,
  });
  return response.data;
};

// ================================================
// 🔁 5. ŞİFRE SIFIRLAMA KODU GÖNDER
// Route: POST /api/auth/send-reset-code
// ================================================
export const sendResetCode = async (email, role) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/send-reset-code`, {
      email,
      role,
    });

    return { ok: true, result: res.data };
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      "Kod gönderilemedi.";
    return { ok: false, result: msg };
  }
};
