import React, { useState } from "react";
import ButtonList from "./components/ButtonList";

const App = () => {
  const [color, setColor] = useState("olive");

  return (
    <div className="w-full h-screen " style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center bottom-12px">
        <ButtonList setColor={setColor} />
      </div>
    </div>
  );
};

export default App;
