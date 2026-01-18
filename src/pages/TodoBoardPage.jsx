import { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard/TodoBoard";
import TodoForm from "../components/TodoForm/TodoForm";
import { getTodos, createTodo, updateTodo } from "../api/todoApi";
import toast from "react-hot-toast";

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
      console.log("POST /todos"); //to delete after testing
      await createTodo(data);
      toast.success("Todo created");
      await loadTodos();
    } catch (error) {
      console.error("Create failed", error);
      throw error; // keep form error handling working
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
      <TodoForm onCreate={handleCreate} />
      <TodoBoard todos={todos} onStatusChange={handleStatusChange} />
      {loading && <p>Loading todos...</p>}
    </>
  );
}
