// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  if (!children) {
    throw new Error("AuthProvider requires a 'children' prop");
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!user;

  const getUserRole = () => user?.role;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
