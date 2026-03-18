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
        {user && <span className="nav-user">Hi, {user.email}</span>}
        <Link to="/todos" className="nav-link">
          My Todos
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
