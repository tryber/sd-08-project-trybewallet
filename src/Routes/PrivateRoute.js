/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Route
      { ...rest }
      render={ (routeProps) => (currentUser ? (
        <RouteComponent { ...routeProps } />
      ) : (
        <Redirect to="/login" />
      )) }
    />
  );
};

export default PrivateRoute;
