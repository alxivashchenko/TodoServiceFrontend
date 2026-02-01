import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

import AuthPage from "./pages/AuthPage";
import TodoBoardPage from "./pages/TodoBoardPage";

export default function App() {
  return (
    <AuthProvider>
      {/* Global toaster – MUST be mounted once */}
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/auth" />} />

          {/* Public routes */}
          <Route path="/auth" element={<AuthPage />} />

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
