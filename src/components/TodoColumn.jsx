import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

export default function TodoColumn({ title, items }) {
  return (
    <div style={{ flex: 1, padding: "10px" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "300px",
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "8px"
            }}
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
