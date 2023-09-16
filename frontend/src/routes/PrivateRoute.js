import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, authorized, ...rest }) => {
  return (
    <Route
      {...rest}
      element={authorized ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
