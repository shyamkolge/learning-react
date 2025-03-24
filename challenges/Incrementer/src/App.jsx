import { useState } from "react";
import "./App.css";

function App() {
  const [steps, setStpes] = useState(1);
  const [count, setCount] = useState(0);
  let date = new Date();
  date.setDate(date.getDate() + count);

  const countIncrement = () => {
    setCount(count + steps);
  };

  const countDecrement = () => {
    setCount((count) => count - steps);
  };

  return (
    <>
      <div>
        <button onClick={() => setStpes((s) => s - 1)}>-</button>
        <span> Steps : {steps}</span>
        <button onClick={() => setStpes((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={countDecrement}>-</button>
        <span> Count : {count}</span>
        <button onClick={countIncrement}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `After ${count} days the day will be `
            : `Before ${Math.abs(count)} days was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
    </>
  );
}

export default App;
