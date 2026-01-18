import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoBoardPage from "./pages/TodoBoardPage";

export default function App() {
  return (
    <AuthProvider>
      {/* Global toaster – MUST be mounted once */}
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoBoardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
