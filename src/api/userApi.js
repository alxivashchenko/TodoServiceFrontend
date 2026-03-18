import api from "./axios";

// Get current logged-in user info
export const getUser = () => api.get("/api/v1/users/me");

// Update user info (email/password)
export const updateUser = (data) => api.put("/api/v1/users/me", data);
