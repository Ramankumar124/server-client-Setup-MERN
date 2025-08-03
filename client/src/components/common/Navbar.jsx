import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const navbarBrandStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#333",
  };

  const navbarMenuStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const navbarItemStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  };

  const logoutButtonStyle = {
    background: "none",
    border: "1px solid #dc3545",
    color: "#dc3545",
    padding: "0.375rem 0.75rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-brand">
        <Link to="/" style={navbarBrandStyle}>
          MyApp
        </Link>
      </div>

      <div style={navbarMenuStyle}>
        {isAuthenticated ? (
          <>
            <div className="navbar-item">
              <Link to="/dashboard" style={navbarItemStyle}>
                Dashboard
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/profile" style={navbarItemStyle}>
                Profile
              </Link>
            </div>
            <div className="navbar-item">
              <span style={{ marginRight: "1rem" }}>
                Welcome, {user?.userName}
              </span>
            </div>
            <div className="navbar-item">
              <button style={logoutButtonStyle} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-item">
              <Link to="/login" style={navbarItemStyle}>
                Login
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/register" style={navbarItemStyle}>
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
