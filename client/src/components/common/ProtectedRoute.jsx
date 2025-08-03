import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "../../features/auth/authSelectors";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
