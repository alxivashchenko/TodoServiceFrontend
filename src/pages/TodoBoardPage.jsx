import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard/TodoBoard";
import TodoForm from "../components/TodoForm/TodoForm";
import Navbar from "../components/navbar/Navbar";

import { getTodos, createTodo, updateTodo } from "../api/todoApi";
import toast from "react-hot-toast";

import "./TodoBoardPage.css";

export default function TodoBoardPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data ?? []);
    } catch (error) {
      console.error("Failed to load todos", error);
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createTodo(data);
      toast.success("Todo created");
      await loadTodos();
    } catch (error) {
      console.error("Create failed", error);
      throw error;
    }
  };

  const handleStatusChange = async (todo, newStatus) => {
    try {
      await updateTodo(todo.id, { ...todo, status: newStatus });
      toast.success("Status updated");
      await loadTodos();
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update todo");
    }
  };

  return (
    <>
      <Navbar />

      <div className="todo-page">
        <div className="todo-page-header">
          <div>
            <Link to="/dashboard" className="back-link">
              ← Back to Dashboard
            </Link>
            <h2>My Todos</h2>
          </div>
        </div>

        <div className="todo-page-content">
          <TodoForm onCreate={handleCreate} />
          {loading ? (
            <p className="loading">Loading todos...</p>
          ) : todos.length === 0 ? (
            <div className="empty-state">
              <p>No todos yet 👀</p>
              <span>Create your first task above</span>
            </div>
          ) : (
            <TodoBoard todos={todos} onStatusChange={handleStatusChange} />
          )}
        </div>
      </div>
    </>
  );
}
