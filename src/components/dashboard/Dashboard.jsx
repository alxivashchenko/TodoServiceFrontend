import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.email || "user"}!</h1>
      <p>This is your landing page.</p>

      <div className="dashboard-links">
        <Link to="/todos">Go to My Todos</Link>
        <Link to="/profile">View/Edit Profile</Link>
      </div>
    </div>
  );
}
