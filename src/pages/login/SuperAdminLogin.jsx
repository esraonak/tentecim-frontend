import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuperAdmin } from "../../api/auth";
import { v4 as uuidv4 } from "uuid";

const SuperAdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const deviceToken = localStorage.getItem("device_token") || uuidv4();
      localStorage.setItem("device_token", deviceToken);

      const result = await loginSuperAdmin(email, password, rememberMe, deviceToken);

      if (result?.user) {
        localStorage.setItem("role", result.user.role);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("username", result.user.username);
        navigate("/dashboard");
      } else {
        setError("Sunucudan kullanıcı bilgisi alınamadı.");
      }
      
      navigate("/dashboard");
    } catch (err) {
      if (err?.response?.data) {
        setError(err.response.data); // Backend'in gönderdiği gerçek hata mesajını gösterir
      } else if (err?.message) {
        setError("Sunucu hatası: " + err.message); // Örneğin bağlantı hatası
      } else {
        setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          SuperAdmin Giriş
        </h2>

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="flex items-center text-sm mb-4">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Beni Hatırla
        </label>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
        >
          Giriş Yap
        </button>

        <div className="text-sm text-center mt-4 space-x-4">
          <a href="/forgot-password?role=superadmin" className="text-indigo-600 hover:underline">
            Şifremi Unuttum
          </a>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SuperAdminLogin;
