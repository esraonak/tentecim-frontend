// 📁 src/pages/SuperAdminContainer.jsx
import React, { useEffect, useState } from 'react';
import SuperAdminDashboard from '../dashboard/SuperAdminDashboard';

// ✅ API fonksiyonlarını içeri aktar
import {
  getDashboardStats,
  getPendingUsers,
  approvePendingUser,
  deletePendingUser,
} from '../../api/superadmin';

export default function SuperAdminContainer() {
  // 📊 Dashboard kutucukları için state
  const [stats, setStats] = useState({
    totalFirms: 0,
    totalAdmins: 0,
    totalUsers: 0,
  });
// 💡 State tanımla
const [showTable, setShowTable] = useState(false);

  // 🕒 Onay bekleyen kullanıcıları tutar
  const [pendingUsers, setPendingUsers] = useState([]);

  // 🧠 Menü slider için toggle fonksiyonu
  const handleToggle = (e) => {
    e.preventDefault();
    const parent = e.currentTarget.closest(".nav-item");
    parent.classList.toggle("menu-open");
    const link = parent.querySelector(".nav-link");
    link.classList.toggle("active");
  };

  // 🔄 Sayfa yüklendiğinde API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);

        const pendingData = await getPendingUsers();
        setPendingUsers(pendingData);
      } catch (error) {
        console.error("Veri çekilemedi:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Kullanıcıyı onayla
const handleApprove = async (id) => {
  try {
    await approvePendingUser(id);
    const updatedList = pendingUsers.filter((u) => u.id !== id);
    setPendingUsers(updatedList);
  } catch (err) {
    console.error("Onaylama hatası:", err);
  }
};

// ❌ Kullanıcıyı reddet
const handleReject = async (id) => {
  try {
    await deletePendingUser(id);
    const updatedList = pendingUsers.filter((u) => u.id !== id);
    setPendingUsers(updatedList);
  } catch (err) {
    console.error("Silme hatası:", err);
  }
};

  
  return (
    <SuperAdminDashboard
  totalFirms={stats.totalFirms}
  totalAdmins={stats.totalAdmins}
  totalUsers={stats.totalUsers}
  pendingUsers={pendingUsers}
  handleToggle={handleToggle}
  onApprove={handleApprove}  // ✅
  onReject={handleReject}    // ✅
  showTable={showTable}           // ✅ yeni props
  setShowTable={setShowTable}
/>
   
  );
}