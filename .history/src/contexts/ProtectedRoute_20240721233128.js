// ProtectedRoute.js
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, getUserRole } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() && allowedRoles.includes(getUserRole()) ? (
          <Component {...props} />
        ) : (
          <Link to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
