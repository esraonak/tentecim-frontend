// Register.jsx
import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Register() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE;

  // 📩 Kod gönder
  const handleSendCode = async () => {
    if (!email) return alert('Lütfen e-posta girin.');
  
    try {
      const response = await fetch(`${API_BASE}/api/email/sendcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
  
      const text = await response.text();
  
      if (response.ok) {
        setCodeSent(true);
        alert(text); // başarılı mesaj zaten plain text
      } else {
        try {
          const json = JSON.parse(text);
          alert(json.message || "Kod gönderimi başarısız.");
        } catch {
          alert(text || "Kod gönderimi başarısız.");
        }
      }
    } catch (error) {
      alert("İstek sırasında hata oluştu: " + error.message);
    }
  };
  

  // ✅ Kod Doğrulama
  const handleVerifyCode = async () => {
    if (!code || !email) return alert("Lütfen kodu ve e-posta adresini girin.");

    try {
      const response = await fetch(`${API_BASE}/api/email/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const result = await response.text();
      if (response.ok) {
        setCodeVerified(true);
        alert("Kod doğrulandı ✅");
      } else {
        alert(`Hata: ${result}`);
      }
    } catch (error) {
      console.error("Kod doğrulama hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // 📝 Kayıt İşlemi
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor!');
      return;
    }

    try {
      const payload = {
        username: fullName,
        email,
        password,
        companyName: role === 'admin' ? companyName : '',
        role,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(`${API_BASE}/api/auth/register`, payload);

      if (response.status === 200) {
        setMessage(response.data.message || 'Kayıt başarılı.');
      } else {
        setError('Kayıt işlemi başarısız.');
      }
    } catch (err) {
      setError(err.response?.data || 'Sunucu hatası oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kayıt Ol</h2>
        {message && <div className="text-green-600 font-medium text-center mb-4">{message}</div>}
        {error && <div className="text-red-600 font-medium text-center mb-4">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="user" checked={role === 'user'} onChange={() => setRole('user')} /> Kullanıcı
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Firma (Admin)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={codeSent} className="mt-1 w-full px-4 py-2 border rounded-md" />
          </div>

          {!codeSent && (
            <button type="button" onClick={handleSendCode} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Kodu Gönder
            </button>
          )}

          {codeSent && !codeVerified && (
            <>
              <input type="text" placeholder="Gelen kodu girin" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
              <button type="button" onClick={handleVerifyCode} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Kodu Doğrula
              </button>
            </>
          )}

          {codeVerified && (
            <>
              {role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Şirket Adı</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Şifre</label>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
                <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 cursor-pointer">
                  {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
                <div onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-9 cursor-pointer">
                  {showConfirm ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                Kayıt Ol
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
