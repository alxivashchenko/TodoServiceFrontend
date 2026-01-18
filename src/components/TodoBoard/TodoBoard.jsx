import { DragDropContext } from "@hello-pangea/dnd";
import TodoColumn from "./TodoColumn";

const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED", "POSTPONED", "CANCELED"];

export default function TodoBoard({ todos, onStatusChange }) {
  // --- Group todos by status ---
  const grouped = STATUSES.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {});

  todos.forEach((t) => {
    const s = t.status ?? "TODO";
    grouped[s].push(t);
  });

  // --- Drag handler ---
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const todo = todos.find((t) => t.id.toString() === draggableId);
    if (!todo) return;

    if (todo.status === destination.droppableId) return;

    onStatusChange(todo, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "10px" }}>
        {STATUSES.map((status) => (
          <TodoColumn key={status} title={status} items={grouped[status]} />
        ))}
      </div>
    </DragDropContext>
  );
}
