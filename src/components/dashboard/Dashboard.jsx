import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      {user?.avatarUrl && (
        <img src={user.avatarUrl} alt="avatar" className="dashboard-avatar" />
      )}

      <h1>Welcome, {user?.displayName || user?.email} 👋</h1>

      <p>Your personal productivity space</p>

      <div className="dashboard-links">
        <Link to="/todos" className="dashboard-button">
          My Todos
        </Link>

        <Link to="/profile" className="dashboard-button">
          Profile Settings
        </Link>
      </div>
    </div>
  );
}
