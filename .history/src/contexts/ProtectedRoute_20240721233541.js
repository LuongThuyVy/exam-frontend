// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
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
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
