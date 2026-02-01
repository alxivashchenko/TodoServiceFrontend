import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TodoItem({ item, index, onDelete }) {
  if (!item) return null;

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
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
            gap: "4px",
            position: "relative",
            ...provided.draggableProps.style,
          }}
        >
          {/* Delete icon */}
          <button
            onClick={() => onDelete(item)}
            title="Delete task"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "14px",
              opacity: 0.6,
              transition: "opacity 0.2s",
            }}
          >
            🗑
          </button>

          {/* Title */}
          <div style={{ fontWeight: 600, fontSize: "16px" }}>
            {item.title ?? "(no title)"}
          </div>

          {/* Description */}
          <div style={{ fontSize: "14px", opacity: 0.85 }}>
            {item.description ?? ""}
          </div>
        </div>
      )}
    </Draggable>
  );
}
