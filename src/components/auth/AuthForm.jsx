import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import "./AuthForm.css";

export default function AuthForm({ mode }) {
  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setBackendError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBackendError("");

    try {
      if (mode === "login") {
        await loginUser({
          email: form.email,
          password: form.password,
        });

        toast.success("Logged in!");
        navigate("/todos"); // ✅ redirect after login
      } else {
        if (form.password !== form.confirmPassword) {
          setBackendError("Passwords do not match");
          return;
        }

        await registerUser({
          email: form.email,
          password: form.password,
        });

        toast.success("Registered! You can now log in.");
      }

      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Auth failed", err);
      setBackendError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast("Password reset is not implemented yet 👀", {
      icon: "ℹ️",
    });
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {mode === "register" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner" />
          ) : mode === "login" ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </form>

      {mode === "login" && (
        <button className="forgot-password" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      )}

      {backendError && <div className="backend-error">{backendError}</div>}

      <Toaster position="top-right" />
    </>
  );
}
