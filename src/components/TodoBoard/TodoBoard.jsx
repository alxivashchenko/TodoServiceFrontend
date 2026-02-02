// TodoBoard.jsx
import { useState, useEffect, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import TodoColumn from "./TodoColumn";
import api from "../../api/axios";

const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED", "POSTPONED", "CANCELED"];

export default function TodoBoard({ todos, onStatusChange }) {
  const [localTodos, setLocalTodos] = useState(todos);

  const backupRef = useRef(null);
  const pendingDeleteRef = useRef(null);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  // --- inline edit update ---
  const handleUpdate = async (id, updated) => {
    const prev = localTodos;

    const existing = localTodos.find((t) => t.id === id);
    if (!existing) return;

    const payload = {
      ...existing, // keep status and other fields
      ...updated, // overwrite title/description
    };

    // optimistic UI
    setLocalTodos((list) => list.map((t) => (t.id === id ? payload : t)));

    try {
      await api.put(`/api/v1/todos/${id}`, payload);
      toast.success("Task updated");
    } catch (err) {
      console.error("Update failed", err);
      setLocalTodos(prev);
      toast.error("Update failed");
    }
  };

  // --- group ---
  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {});

  localTodos.forEach((t) => {
    const s = t.status ?? "TODO";
    grouped[s].push(t);
  });

  // --- drag ---
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const todo = localTodos.find((t) => t.id.toString() === draggableId);
    if (!todo) return;

    if (todo.status === destination.droppableId) return;

    onStatusChange(todo, destination.droppableId);
  };

  // --- delete (unchanged) ---
  const handleDelete = (task) => {
    backupRef.current = localTodos;
    pendingDeleteRef.current = task;

    setLocalTodos((prev) => prev.filter((t) => t.id !== task.id));

    const timeout = setTimeout(async () => {
      if (pendingDeleteRef.current?.id === task.id) {
        try {
          await api.delete(`/api/v1/todos/${task.id}`);
          pendingDeleteRef.current = null;
          backupRef.current = null;
        } catch (err) {
          console.error("Delete failed", err);
          toast.error("Delete failed");
        }
      }
    }, 5000);

    toast(
      (t) => (
        <span>
          Task deleted
          <button
            onClick={() => {
              clearTimeout(timeout);
              undoDelete();
              toast.dismiss(t.id);
            }}
            style={{ marginLeft: "10px", fontWeight: "bold" }}
          >
            Undo
          </button>
        </span>
      ),
      { duration: 5000 },
    );
  };

  const undoDelete = () => {
    if (!backupRef.current) return;

    setLocalTodos(backupRef.current);
    backupRef.current = null;
    pendingDeleteRef.current = null;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "10px" }}>
        {STATUSES.map((status) => (
          <TodoColumn
            key={status}
            title={status}
            items={grouped[status]}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
