import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TodoItem({ item, index }) {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          className="todo-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "10px",
            marginBottom: "8px",
            background: "#fff",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            ...provided.draggableProps.style,
          }}
        >
          <strong>{item.title}</strong>
          <p>{item.description}</p>
          <small>User: {item.userId}</small>
        </div>
      )}
    </Draggable>
  );
}
