import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner";

const Dashboard = () => {
  const { user, loading, getUserProfile } = useAuth();



  const containerStyle = {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const cardStyle = {
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={containerStyle}>
      <h1>Dashboard</h1>

      {user && (
        <div style={cardStyle}>
          <h2>Welcome, {user.userName}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div style={cardStyle}>
        <h3>Your Content</h3>
        <p>
          This is your secure dashboard area. Only authenticated users can see
          this content.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
