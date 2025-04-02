// ✅ Gereksiz olan: useState, useEffect ve fetchAdminsByFirmId kaldırıldı
// ✅ Yerine: availableAdmins props'u eklendi

import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { fetchFirms, fetchFirmDetails } from '../api/firms';
import Select from 'react-select';
import Flag from 'react-world-flags';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

export default function Register({
  role, setRole,
  email, setEmail,
  codeSent, setCodeSent,
  code, setCode,
  codeVerified, setCodeVerified,
  fullName, setFullName,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  showPassword, setShowPassword,
  showConfirm, setShowConfirm,
  message, error,
  onSendCode, onVerifyCode, onRegister,
  firmId, setFirmId,
  country, setCountry,
  city, setCity,
  currency, setCurrency,
  parentAdminId, setParentAdminId,
  availableAdmins // ✅ props olarak dışarıdan geliyor
}) {
  const [firms, setFirms] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  const allCountries = Object.entries(countries.getNames('en')).map(([code, name]) => ({
    value: code,
    label: (
      <>
        <Flag code={code} style={{ width: 20, marginRight: 8 }} /> {name}
      </>
    )
  }));

  useEffect(() => {
    const loadFirms = async () => {
      const data = await fetchFirms();
      setFirms(data);
    };
    loadFirms();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (firmId) {
        const details = await fetchFirmDetails(firmId);
        setAvailableCountries(details.supportedCountries || []);
        setAvailableCurrencies(details.supportedCurrencies || []);
        const cities = details.supportedCities || {};
        const defaultCountry = details.supportedCountries?.[0] || 'TR';
        setAvailableCities(cities[defaultCountry] || []);
        setCountry(defaultCountry);
        setCurrency(details.supportedCurrencies?.[0] || 'TRY');
        setCity((cities[defaultCountry] || [])[0] || '');
      }
    };
    loadDetails();
  }, [firmId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kayıt Ol</h2>
        {message && <div className="text-green-600 font-medium text-center mb-4">{message}</div>}
        {error && <div className="text-red-600 font-medium text-center mb-4">{error}</div>}

        <form onSubmit={onRegister} className="space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="user" checked={role === 'user'} onChange={() => setRole('user')} /> Kullanıcı
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Firma (Admin)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Firma Seç</label>
            <select value={firmId || ''} onChange={(e) => setFirmId(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md">
              <option value="">Firma Seçiniz</option>
              {firms.map(firm => (
                <option key={firm.id} value={firm.id}>{firm.name}</option>
              ))}
            </select>
          </div>

          {role === 'user' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Seç</label>
              <select value={parentAdminId || ''} onChange={(e) => setParentAdminId(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md">
                <option value="">Admin Seçiniz</option>
                {availableAdmins.map(admin => (
                  <option key={admin.id} value={admin.id}>{admin.username} ({admin.email})</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input type="email" disabled={!firmId} placeholder="E-posta adresi" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md" />
          </div>

          {!codeSent && (
            <button type="button" onClick={onSendCode} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Kodu Gönder
            </button>
          )}

          {codeSent && !codeVerified && (
            <>
              <input type="text" placeholder="Gelen kodu girin" value={code} onChange={(e) => setCode(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
              <button type="button" onClick={onVerifyCode} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                Kodu Doğrula
              </button>
            </>
          )}

          {codeVerified && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ülke</label>
                <Select
                  options={allCountries.filter(c => availableCountries.includes(c.value))}
                  value={allCountries.find(opt => opt.value === country)}
                  onChange={(selected) => {
                    setCountry(selected.value);
                    setAvailableCities(firms.find(f => f.id === firmId)?.supportedCities?.[selected.value] || []);
                    setCity('');
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Şehir</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md">
                  {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Para Birimi</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md">
                  {availableCurrencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                </select>
              </div>

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
