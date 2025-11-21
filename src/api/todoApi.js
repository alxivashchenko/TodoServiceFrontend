import axios from "axios";

// const API_URL = "http://localhost:8080/api/v1/todos"; // adjust to your backend
const API_URL = "/api/v1/todos"; // adjust to your backend


export const getTodos = () => axios.get(API_URL);

export const getTodo = (id) => axios.get(`${API_URL}/${id}`);

export const createTodo = (todo) => axios.post(API_URL, todo);

export const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);

export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

