import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";

const Admin = (props) => {
  const { user } = useAuth();
  if (props.admin && user.role === "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Admin Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt={"10"}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Admin;
