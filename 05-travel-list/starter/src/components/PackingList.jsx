/* eslint-disable no-unused-vars */
import React from "react";
import Items from "./Items";
import { useState } from "react";

const PackingList = ({ items, onDeleteItem, onToggleItems, onClear }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  console.log(sortedItems);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((sortedItem) => (
          <Items
            item={sortedItem}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={sortedItem.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Descrtion</option>
          <option value="packed">Sort by packed Itmes</option>
        </select>

        <button onClick={() => onClear()}>Clear List</button>
      </div>
    </div>
  );
};

export default PackingList;
