import React, { useState, useEffect } from 'react';
import Register from '../Register';
import { sendVerificationCode, verifyCode, registerUser } from '../../api/auth';
import { fetchAdminsByFirmId } from '../../api/firms'; // ✅ adminleri getir

export default function RegisterContainer() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [firmId, setFirmId] = useState('');
  const [country, setCountry] = useState('TR');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('TRY');

  const [parentAdminId, setParentAdminId] = useState(''); // ✅ admin seçimi için
  const [availableAdmins, setAvailableAdmins] = useState([]); // ✅ admin listesi

  useEffect(() => {
    const loadAdmins = async () => {
      if (firmId && role === 'user') {
        const admins = await fetchAdminsByFirmId(firmId);
        setAvailableAdmins(admins);
        setParentAdminId('');
      } else {
        setAvailableAdmins([]);
        setParentAdminId('');
      }
    };
    loadAdmins();
  }, [firmId, role]);

  const onSendCode = async () => {
    if (!email || !firmId) return alert("E-posta ve firma seçimi gerekli!");
    const result = await sendVerificationCode(email, firmId);
    if (result.ok) {
      setCodeSent(true);
      alert(result.result.message || result.result || "Kod gönderildi ✅");
    } else {
      alert(result.result);
    }
  };

  const onVerifyCode = async () => {
    if (!code || !email) return alert("E-posta ve kod girilmeli");
    const result = await verifyCode(email, code);
    if (result.ok) {
      setCodeVerified(true);
      alert("Kod doğrulandı ✅");
    } else {
      alert(result.result);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword)
      return setError("Şifreler uyuşmuyor");

    try {
      const payload = {
        username: fullName,
        email,
        password,
        role,
        firmId,
        parentAdminId: role === 'user' ? parentAdminId : null,
        country,
        city,
        currency,
        createdAt: new Date().toISOString(),
      };
      const response = await registerUser(payload);
      setMessage(response.message || "Kayıt başarılı");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Register
      role={role} setRole={setRole}
      email={email} setEmail={setEmail}
      codeSent={codeSent} setCodeSent={setCodeSent}
      code={code} setCode={setCode}
      codeVerified={codeVerified} setCodeVerified={setCodeVerified}
      fullName={fullName} setFullName={setFullName}
      password={password} setPassword={setPassword}
      confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
      showPassword={showPassword} setShowPassword={setShowPassword}
      showConfirm={showConfirm} setShowConfirm={setShowConfirm}
      message={message}
      error={error}
      onSendCode={onSendCode}
      onVerifyCode={onVerifyCode}
      onRegister={onRegister}
      firmId={firmId} setFirmId={setFirmId}
      country={country} setCountry={setCountry}
      city={city} setCity={setCity}
      currency={currency} setCurrency={setCurrency}
      parentAdminId={parentAdminId} setParentAdminId={setParentAdminId}
      availableAdmins={availableAdmins}
    />
  );
}
