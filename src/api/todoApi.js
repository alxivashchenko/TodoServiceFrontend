import axios from "axios";

const API_URL = "/api/v1/todos";

// ------ Token helper ------
export const getToken = () => localStorage.getItem("jwt");
export const setToken = (token) => localStorage.setItem("jwt", token);
export const clearToken = () => localStorage.removeItem("jwt");

// ------ Axios instance ------
const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

// ------ Todo API ------
export const getTodos = () => api.get("/"); // GET all todos (user-specific if backend checks JWT)
export const getTodo = (id) => api.get(`/${id}`); // GET single todo
export const createTodo = (todo) => api.post("/", todo); // POST new todo
export const updateTodo = (id, todo) => api.put(`/${id}`, todo); // PUT update todo
export const deleteTodo = (id) => api.delete(`/${id}`); // DELETE todo

// ------ Auth API ------
const AUTH_URL = "/api/v1/auth";
export const login = (email, password) =>
  axios.post(`${AUTH_URL}/login`, { email, password });

export const register = (email, password) =>
  axios.post(`${AUTH_URL}/register`, { email, password });
