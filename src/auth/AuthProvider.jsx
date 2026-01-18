import { useState } from "react";
import AuthContext from "./AuthContext";
import { login, register, logout } from "../api/authApi";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  const loginUser = async (credentials) => {
    const res = await login(credentials);
    localStorage.setItem("accessToken", res.data.accessToken);
    setAccessToken(res.data.accessToken);
  };

  const registerUser = async (data) => {
    await register(data);
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
