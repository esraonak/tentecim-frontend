import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables"; // js dosyası
import "datatables.net-dt/css/dataTables.dataTables.min.css"; // ✅ dikkat: doğru CSS yolu bu


// 🧱 Ana bileşen
export default function SuperAdminDashboard({
  totalFirms,
  totalAdmins,
  totalUsers,
  pendingUsers,
  handleToggle,
  handleApprove,
  handleReject,
  showTable,        // ✅ ekledik
  setShowTable      // ✅ ekledik
}) {
  // 🔁 Tablo verisi değiştiğinde DataTable'ı yükle
  useEffect(() => {
    if (pendingUsers.length > 0) {
      setTimeout(() => {
        $('#pendingUsersTable').DataTable();
      }, 100);
    }
  }, [pendingUsers]);



  return (
    <div className="wrapper">
  {/* Navbar */}  
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Sol kısım */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button">
        <i className="fas fa-bars"></i>
      </a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link">Ana Sayfa</a>
    </li>
  </ul>

  {/* Sağ kısım */}
  <ul className="navbar-nav ml-auto">
    {/* Arama */}
    <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="#" role="button">
        <i className="fas fa-search"></i>
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-lg w-100">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search"></i>
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>

    {/* Bildirim */}
    <li className="nav-item dropdown">
  <a className="nav-link position-relative" data-toggle="dropdown" href="#">
    <i className="far fa-bell"></i>
    <span
      className="badge badge-warning"
      style={{
        position: 'absolute',
        top: '0px',
        right: '-5px',
        fontSize: '0.6rem',
        padding: '2px 5px',
        borderRadius: '50%',
      }}
    >
      15
    </span>
  </a>

  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span className="dropdown-header">15 Bildirim</span>
    <div className="dropdown-divider"></div>
    <a href="#" className="dropdown-item">
      <i className="fas fa-user-plus mr-2"></i> 1 yeni kullanıcı eklendi
      <span className="float-right text-muted text-sm">2 dk önce</span>
    </a>
    <div className="dropdown-divider"></div>
    <a href="#" className="dropdown-item dropdown-footer">Tüm Bildirimleri Gör</a>
  </div>
</li>



    {/* Fullscreen */}
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-expand-arrows-alt"></i>
      </a>
    </li>

    {/* Çıkış */}
    <li className="nav-item">
      <a className="nav-link text-danger" href="#" title="Çıkış">
        <i className="fas fa-sign-out-alt"></i>
      </a>
    </li>
  </ul>
</nav>




      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">Tentecim Panel</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                SuperAdmin
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link" onClick={handleToggle}>
                  <i className="nav-icon fas fa-building"></i>
                  <p>
                    Firmalar
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item"><a href="#" className="nav-link"><p>Firmalar</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Tam Yetkili</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Admin</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>User</p></a></li>
                </ul>
              </li>

              {/* Onay Bekleyenler */}
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={() => setShowTable(!showTable)}>
                  <i className="nav-icon fas fa-hourglass-half"></i>
                  <p>Onay Bekleyenler</p>
                </a>
              </li>

              <li className="nav-item has-treeview" onClick={handleToggle}>
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-clipboard-list"></i>
                  <p>
                    Loglar
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item"><a href="#" className="nav-link"><p>Giriş Logları</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Şifre Sıfırlama Logları</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>İşlem Logları</p></a></li>
                </ul>
              </li>
              <li className="nav-item has-treeview" onClick={handleToggle}>
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-tools"></i>
                  <p>
                    Yönetim
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item"><a href="#" className="nav-link"><p>Firma Ekle</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Yetkili Admin Ekle</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Admin Ekle</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>User Ekle</p></a></li>
                </ul>
              </li>
              <li className="nav-item has-treeview" onClick={handleToggle}>
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>
                    Firma Ayarları
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item"><a href="#" className="nav-link"><p>Firmalar</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Tam Yetkili Admin</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Admin</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>User</p></a></li>
                </ul>
              </li>
              <li className="nav-item has-treeview" onClick={handleToggle}>
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-wrench"></i>
                  <p>
                    Ayarlar
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item"><a href="#" className="nav-link"><p>Şifre İşlemleri</p></a></li>
                  <li className="nav-item"><a href="#" className="nav-link"><p>Güvenli Çıkış</p></a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>


      {/* Content */}
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Ana Sayfa</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{totalFirms}</h3>
                    <p>Toplam Firma</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    Detaylar <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{totalAdmins}</h3>
                    <p>Toplam Admin</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    Detaylar <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{totalUsers}</h3>
                    <p>Toplam Kullanıcı</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    Detaylar <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* 🟨 Onay Bekleyenler Tablosu */}
            {showTable && pendingUsers.length > 0 && (
              <div className="card m-3">
                <div className="card-header"><h3 className="card-title">Onay Bekleyen Kullanıcılar</h3></div>
                <div className="card-body">
                  <table id="pendingUsersTable" className="table table-bordered table-striped w-100">
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
  {pendingUsers.map((user, i) => (
    <tr key={user.id || i}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.role}</td>
      <td>
        <button
          className="btn btn-sm btn-success mr-2"
          onClick={() => handleApprove(user.id)} // ✅ tıklandığında onayla
        >
          Onayla
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleReject(user.id)} // ❌ tıklandığında reddet
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
            )}



          </div>
        </section>
      </div>
    </div>
  );
}