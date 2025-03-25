/* eslint-disable no-unused-vars */
import React from "react";

const Items = ({ item, onDeleteItem, onToggleItems }) => {
  const { id, description, quantity, packed } = item;

  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onClick={() => {
          onToggleItems(id);
        }}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button
        onClick={() => {
          onDeleteItem(id);
        }}
      >
        ❌
      </button>
    </li>
  );
};

export default Items;
