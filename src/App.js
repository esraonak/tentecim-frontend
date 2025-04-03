// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminContainer from './pages/container/SuperAdminContainer';
import RegisterContainer from './pages/container/RegisterContainer';
import ForgotPassword from './pages/login/ForgotPassword';
import AdminLogin from './pages/login/AdminLogin';
import UserLogin from './pages/login/UserLogin';
import SuperAdminLogin from './pages/login/SuperAdminLogin';
import PrivateRoute from './routes/PrivateRoute';

// 🔒 (isteğe bağlı: eklenince açarsın)
// import AdminContainer from './pages/container/AdminContainer';
// import UserContainer from './pages/container/UserContainer';

const getCurrentUserRole = () => {
  return localStorage.getItem('role');
};

function App() {
  const role = getCurrentUserRole();

  return (
    <Router>
      <Routes>
        {/* 🔑 Giriş Sayfaları */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* 🔁 Şifremi Unuttum */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 📝 Kayıt Sayfası */}
        <Route path="/register" element={<RegisterContainer />} />

        {/* 🛡️ PrivateRoute ile korunan paneller */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["superadmin"]}>
              <SuperAdminContainer />
            </PrivateRoute>
          }
        />

        {/* Örnek olarak admin/user route'ları — ileride aktif edilir */}
        {/* 
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "superadmin"]}>
              <AdminContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute allowedRoles={["user", "superadmin"]}>
              <UserContainer />
            </PrivateRoute>
          }
        />
        */}

        {/* 🎯 Girişte yönlendirme */}
        <Route
          path="/"
          element={
            role === 'superadmin'
              ? <Navigate to="/dashboard" />
              : role === 'admin'
              ? <Navigate to="/admin/dashboard" />
              : role === 'user'
              ? <Navigate to="/user/dashboard" />
              : <Navigate to="/login/user" />
          }
        />

        {/* 🧼 404 veya bilinmeyen route → yine yönlendirme */}
        <Route
          path="*"
          element={
            role === 'superadmin'
              ? <Navigate to="/dashboard" />
              : role === 'admin'
              ? <Navigate to="/admin/dashboard" />
              : role === 'user'
              ? <Navigate to="/user/dashboard" />
              : <Navigate to="/login/user" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
