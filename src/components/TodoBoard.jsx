import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TodoForm from "./TodoForm";
import TodoColumn from "./TodoColumn";
import { getTodos, createTodo, updateTodo } from "../api/todoApi";

const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED", "POSTPONED", "CANCELED"];

export default function TodoBoard() {
  const [todos, setTodos] = useState([]);

  // --- Load existing todos from backend safely ---
  useEffect(() => {
    let isMounted = true; // track if component is mounted

    const loadTodos = async () => {
      try {
        const response = await getTodos();
        if (isMounted) setTodos(response.data);
      } catch (error) {
        console.error("Failed to load todos", error);
      }
    };

    loadTodos();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, []);

  // --- Create new todo ---
  const addTodo = async (data) => {
    try {
      await createTodo(data);
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to create todo", error);
      throw error; // re-throw for form error handling
    }
  };

  // --- Drag & drop ---
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    // Find the todo being dragged
    const todo = todos.find((t) => t.id.toString() === draggableId);
    if (!todo) return;

    const updatedTodo = { ...todo, status: destination.droppableId };

    try {
      await updateTodo(draggableId, updatedTodo); // send full todo
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  // --- Group todos by status ---
  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = todos.filter((t) => t.status === status);
    return acc;
  }, {});

  return (
    <div>
      <TodoForm onCreate={addTodo} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "10px" }}>
          {STATUSES.map((s) => (
            <TodoColumn key={s} title={s} items={grouped[s]} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
