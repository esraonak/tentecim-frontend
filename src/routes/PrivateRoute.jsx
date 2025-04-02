import React from "react";
import { Navigate } from "react-router-dom";

/**
 * @param {ReactNode} children: Giriş yapmışsa gösterilecek bileşen
 * @param {Array} allowedRoles: Bu route'a hangi roller erişebilir
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login/user" />; // Giriş yapılmamışsa login'e yönlendir
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Rol yetkili değilse anasayfaya yönlendir
  }

  return children; // Erişim yetkiliyse bileşeni göster
};

export default PrivateRoute;
