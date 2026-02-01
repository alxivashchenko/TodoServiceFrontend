import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { login, register, logout } from "../api/authApi";

export default function AuthProvider({ children }) {
  // ✅ lazy initialization (runs once)
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken"),
  );

  const loginUser = async (credentials) => {
    const res = await login(credentials);
    const token = res.data.accessToken;

    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const registerUser = async (data) => {
    await register(data);
  };

  const logoutUser = async () => {
    await logout(); // optional backend call
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(accessToken),
        accessToken,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
