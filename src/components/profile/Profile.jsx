import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { updateUser } from "../../api/userApi";
import toast from "react-hot-toast";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, updateUserInfo } = useAuth();

  const [form, setForm] = useState({
    email: "",
    displayName: "",
    avatarUrl: "",
    timezone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        displayName: user.displayName || "",
        avatarUrl: user.avatarUrl || "",
        timezone: user.timezone || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email: form.email,
        displayName: form.displayName,
        avatarUrl: form.avatarUrl,
        timezone: form.timezone,
      };

      if (form.password) {
        payload.password = form.password;
      }

      const res = await updateUser(payload);

      updateUserInfo(res.data);

      toast.success("Profile updated");

      setForm({
        ...form,
        password: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      <h2>Profile</h2>

      {user?.createdAt && (
        <p className="profile-created">
          Account created: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Display Name</label>
        <input
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
        />

        {form.avatarUrl && (
          <img
            src={form.avatarUrl}
            alt="avatar preview"
            onError={(e) => (e.target.style.display = "none")}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        )}

        <label>Avatar URL</label>
        <input
          name="avatarUrl"
          value={form.avatarUrl}
          onChange={handleChange}
        />

        <label>Timezone</label>
        <input name="timezone" value={form.timezone} onChange={handleChange} />

        <label>New Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
