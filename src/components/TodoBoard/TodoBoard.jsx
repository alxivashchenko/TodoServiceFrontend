import { useState, useEffect, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import TodoColumn from "./TodoColumn";
import api from "../../api/axios";

const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED", "POSTPONED", "CANCELED"];

export default function TodoBoard({ todos, onStatusChange }) {
  const [localTodos, setLocalTodos] = useState(todos);

  // snapshot BEFORE delete
  const backupRef = useRef(null);
  const pendingDeleteRef = useRef(null);

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

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

  // --- delete ---
  const handleDelete = (task) => {
    backupRef.current = localTodos; // save snapshot
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
          />
        ))}
      </div>
    </DragDropContext>
  );
}
