import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TodoItem({ item, index }) {
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
            ...provided.draggableProps.style,
          }}
        >
          {/* Title */}
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            {item.title ?? "(no title)"}
          </div>

          {/* Description */}
          <div style={{ fontSize: "13px", opacity: 0.85 }}>
            {item.description ?? ""}
          </div>

          {/* User */}
          <div style={{ fontSize: "11px", opacity: 0.6 }}>
            User: {item.userId ?? "unknown"}
          </div>
        </div>
      )}
    </Draggable>
  );
}
