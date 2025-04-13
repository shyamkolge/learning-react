import React from "react";
import Buttons from "./buttons";

const colors = [
  {
    btnName: "Black",
    btnColor: "black",
  },
  {
    btnName: "Orange",
    btnColor: "orange",
  },
  {
    btnName: "Blue",
    btnColor: "blue",
  },
  {
    btnName: "Pink",
    btnColor: "pink",
  },
  {
    btnName: "Green",
    btnColor: "green",
  },
];

function ButtonList({ setColor }) {
  return (
    <div className="max-w-fit fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 bg-white py-2 gap-3 shadow-lg rounded-lg">
      {colors.map((btn) => {
        return <Buttons btn={btn} key={btn.btnName} setColor={setColor} />;
      })}
    </div>
  );
}

export default ButtonList;
