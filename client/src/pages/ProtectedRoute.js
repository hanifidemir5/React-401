import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
