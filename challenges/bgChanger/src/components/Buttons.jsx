import React from "react";

function Buttons({ btn, setColor }) {
  return (
    <button
      style={{
        backgroundColor: `${btn.btnColor}`,
        color: "white",
        padding: "15px 50px",
        borderRadius: "40px",
        fontSize: "20px",
      }}
      onClick={() => setColor(btn.btnColor)}
    >
      {btn.btnName}
    </button>
  );
}

export default Buttons;
