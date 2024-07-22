import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../cont';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated()) {
    // Nếu đã đăng nhập, chuyển hướng đến trang chính hoặc trang người dùng đã đăng nhập.
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RedirectIfAuthenticated;
