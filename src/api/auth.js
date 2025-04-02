// src/api/auth.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

/**
 * 📩 E-posta adresine doğrulama kodu gönderir.
 */
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
    return { ok: false, result: "İstek sırasında bir hata oluştu: " + error.message };
  }
};

/**
 * ✅ Kullanıcının girdiği e-posta ve kodu doğrular.
 */
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
    return { ok: false, result: "Doğrulama isteği başarısız: " + error.message };
  }
};

/**
 * 📝 Yeni kullanıcı (Admin/User) kaydı oluşturur.
 */
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

/**
 * 🔐 SuperAdmin girişi yapar.
 */
export const loginSuperAdmin = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/auth/login`, {
    email,
    password,
    role: "superadmin",
    rememberMe,
    deviceToken,
  });
  return response.data;
};

/**
 * 🔐 Admin girişi yapar.
 */
export const loginAdmin = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/auth/login`, {
    email,
    password,
    role: "admin",
    rememberMe,
    deviceToken,
  });
  return response.data;
};

/**
 * 🔐 User girişi yapar.
 */
export const loginUser = async (email, password, rememberMe, deviceToken) => {
  const response = await axios.post(`${API_BASE}/api/auth/login`, {
    email,
    password,
    role: "user",
    rememberMe,
    deviceToken,
  });
  return response.data;
};

// src/api/auth.js
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



