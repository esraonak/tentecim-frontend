import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { sendResetCode } from "../../api/auth";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "superadmin";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ SEND-RESET-CODE endpointini tetikleyen fonksiyon
  const handleSendCode = async () => {
    try {
      const res = await sendResetCode(email, role);
      if (res.ok) {
        setStep(2);
        setMessage("Kod e-posta adresinize gönderildi.");
        setError("");
      } else {
        setError(res.result || "Kod gönderme sırasında hata oluştu.");
        setMessage("");
      }
    } catch (err) {
      setError("Sunucu hatası: " + err.message);
      setMessage("");
    }
  };

  // ✅ Şifreyi sıfırlama işlemi
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, code, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      setMessage(data.message || "Şifreniz güncellendi.");
      setError("");

      setTimeout(() => {
        navigate(`/login/${role}`);
      }, 2000);
    } catch (err) {
      setError(err.message || "Şifre sıfırlama işlemi başarısız.");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Şifremi Unuttum <span className="text-sm font-normal text-gray-500">({role})</span>
        </h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />

            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Kodu Gönder
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Kod"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Yeni Şifre"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-lg cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Şifre Tekrar"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-lg cursor-pointer"
              >
                {showConfirm ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
            >
              Şifreyi Güncelle
            </button>
          </>
        )}

        {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
