import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

export default function TodoColumn({ title, items = [] }) {
  const containerStyle = {
    flex: 1,
    padding: "10px",
  };

  const dropzoneStyle = {
    minHeight: "300px",
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
        {title}
      </h3>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={dropzoneStyle}
            aria-label={`Todo column ${title}`}
          >
            {items.map((item, index) => (
              <TodoItem key={item.id} item={item} index={index} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
