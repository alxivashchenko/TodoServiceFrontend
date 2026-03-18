import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

import AuthPage from "./pages/AuthPage";
import TodoBoardPage from "./pages/TodoBoardPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Public */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoBoardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
