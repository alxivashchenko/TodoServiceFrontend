import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("accessToken", refreshRes.data.accessToken);
        error.config.headers.Authorization =
          "Bearer " + refreshRes.data.accessToken;

        return api(error.config);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/api/v1/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
