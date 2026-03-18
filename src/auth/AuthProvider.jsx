import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login, register, logout } from "../api/authApi";
import { getUser } from "../api/userApi";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken"),
  );

  const [user, setUser] = useState(null);

  // ---- load user when token exists ----
  useEffect(() => {
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [accessToken]);

  const loginUser = async (credentials) => {
    const res = await login(credentials);
    const token = res.data.accessToken;

    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const registerUser = async (data) => {
    await register(data);

    // auto login after register
    await loginUser({
      email: data.email,
      password: data.password,
    });
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setUser(null);
  };

  const updateUserInfo = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(accessToken),
        accessToken,
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
