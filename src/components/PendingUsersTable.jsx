// 📁 src/components/PendingUsersTable.jsx

import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";

// ✅ PendingUsersTable bileşeni dışarıdan veri alır ve tabloyu oluşturur
export default function PendingUsersTable({ data, onReject }) {
  useEffect(() => {
    // DataTable'ı sadece bir kez initialize et
    if (!$.fn.DataTable.isDataTable("#pendingTable")) {
      $('#pendingTable').DataTable();
    }
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-header bg-warning">
        <h3 className="card-title text-white">Onay Bekleyen Kullanıcılar</h3>
      </div>
      <div className="card-body">
        <table id="pendingTable" className="display" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Kullanıcı Adı</th>
              <th>E-Posta</th>
              <th>Telefon</th>
              <th>Rol</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-success btn-sm mr-2">Onayla</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onReject(user.id)}
                  >
                    Reddet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
