import React from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="nav-logo">
          TodoApp
        </Link>
      </div>

      <div className="navbar-right">
        {user?.avatarUrl && (
          <img src={user.avatarUrl} alt="avatar" className="nav-avatar" />
        )}

        <span className="nav-user">{user?.displayName || user?.email}</span>

        <Link to="/todos" className="nav-link">
          Todos
        </Link>

        <Link to="/profile" className="nav-link">
          Profile
        </Link>

        <button onClick={logoutUser} className="nav-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}
