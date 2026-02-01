import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Todo App</h1>

        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <div className="auth-content">
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}
