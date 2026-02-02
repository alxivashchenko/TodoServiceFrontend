// TodoItem.jsx
import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TodoItem({ item, index, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: item.title ?? "",
    description: item.description ?? "",
  });

  if (!item) return null;

  const save = () => {
    onUpdate(item.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft({
      title: item.title ?? "",
      description: item.description ?? "",
    });
    setEditing(false);
  };

  return (
    <Draggable
      draggableId={item.id.toString()}
      index={index}
      isDragDisabled={editing}
    >
      {(provided) => (
        <div
          className="todo-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: "#fff",
            borderRadius: "6px",
            padding: "12px",
            marginBottom: "10px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            position: "relative",
            ...provided.draggableProps.style,
          }}
        >
          {/* icons */}
          {!editing && (
            <>
              <button
                onClick={() => setEditing(true)}
                title="Edit task"
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "32px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  opacity: 0.6,
                }}
              >
                ✏️
              </button>

              <button
                onClick={() => onDelete(item)}
                title="Delete task"
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  opacity: 0.6,
                }}
              >
                🗑
              </button>
            </>
          )}

          {/* edit mode */}
          {editing ? (
            <>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />

              <textarea
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
              />

              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={save}>Save</button>
                <button onClick={cancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                {item.title ?? "(no title)"}
              </div>

              <div style={{ fontSize: "14px", opacity: 0.85 }}>
                {item.description ?? ""}
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}
