import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// ----- REQUEST -----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----- RESPONSE -----
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/refresh");

    // ❌ Do NOT refresh for auth endpoints
    if (
      error.response?.status === 401 &&
      !isAuthEndpoint &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          { withCredentials: true },
        );

        localStorage.setItem("accessToken", refreshRes.data.accessToken);
        originalRequest.headers.Authorization =
          "Bearer " + refreshRes.data.accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        // refresh failed → logout
        localStorage.removeItem("accessToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    // Normal error (including login failure)
    return Promise.reject(error);
  },
);

export default api;
