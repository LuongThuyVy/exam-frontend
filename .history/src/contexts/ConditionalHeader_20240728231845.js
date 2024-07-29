import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import { Role } from '../../';

const ConditionalHeader = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (role === 'admin') {
    return <AdminHeader />;
  }

  return <Header />;
};

export default ConditionalHeader;
