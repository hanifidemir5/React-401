import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ admin }) => {
  const { loggedIn, user } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }
  console.log(admin, user.role);

  return <Outlet />;
};

export default ProtectedRoute;
