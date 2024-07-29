import React from 'react';
import { useAuth } from './AuthContext';
import Header from '../components/Layout/Header';
import AdminHeader from '../components/Admin/AdminHeader';

const ConditionalHeader = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (role === 'admin') {
    return <AdminHeader />;
  }

  return <Header />;
};

export default ConditionalHeader;
