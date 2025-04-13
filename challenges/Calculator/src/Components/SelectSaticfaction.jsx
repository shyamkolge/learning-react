import React, { useState } from "react";

const SelectSaticfaction = ({ children, percentage, onSelect }) => {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value={0}>Disssatified(0%)</option>
        <option value={5}>It was Ok.!(5%)</option>
        <option value={10}>It was Good (10%)</option>
        <option value={20}>It was Amazing (20%)</option>
      </select>
    </div>
  );
};

export default SelectSaticfaction;
