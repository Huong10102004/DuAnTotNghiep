import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Nếu không có token, chuyển hướng về trang đăng nhập
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;