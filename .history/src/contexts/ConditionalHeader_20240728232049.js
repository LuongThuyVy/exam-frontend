import React from 'react';
import { useAuth } from './AuthContext';
import Header from '../';
import AdminHeader from '../components/Admin/AdminHeader';
import { Role } from '../Role';

const ConditionalHeader = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (role === 'admin') {
    return <AdminHeader />;
  }

  return <Header />;
};

export default ConditionalHeader;
