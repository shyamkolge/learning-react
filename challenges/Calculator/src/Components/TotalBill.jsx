import React from "react";

const TotalBill = ({ bill, onHandle }) => {
  return (
    <div>
      <label htmlFor="bill">How much was the bill ..? : </label>
      <input
        value={bill}
        id="bill"
        onChange={(e) => onHandle(Number(e.target.value))}
        type="text"
        placeholder="Enter Total Bill Amount"
      />
    </div>
  );
};

export default TotalBill;
