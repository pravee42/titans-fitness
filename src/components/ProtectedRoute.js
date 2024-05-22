import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTokenData } from './utils/token';

const ProtectedRoute = ({ element: Component, requiredRole, adminOnly, ...rest }) => {
  const tokenData = getTokenData();

  if (!tokenData) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && tokenData.role !== 'admin') {
    return <Navigate to="/userdashboard" />;
  }

  if (requiredRole && tokenData.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
