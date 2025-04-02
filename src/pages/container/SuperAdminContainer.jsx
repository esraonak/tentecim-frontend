// src/pages/SuperAdminContainer.jsx
import React, { useEffect, useState } from 'react';
import SuperAdminDashboard from '../dashboard/SuperAdminDashboard';
import { getDashboardStats } from '../../api/superadmin'; // 📌 Örnek bir API dosyası varsayalım

export default function SuperAdminContainer() {
  const [stats, setStats] = useState({
    totalFirms: 0,
    totalAdmins: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Veriler alınamadı:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <SuperAdminDashboard
      totalFirms={stats.totalFirms}
      totalAdmins={stats.totalAdmins}
      totalUsers={stats.totalUsers}
    />
  );
}
