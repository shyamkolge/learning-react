import { useState } from "react";
import "./App.css";

function App() {
  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  const [steps, setSteps] = useState(1);

  const [close, setClose] = useState(true);

  const previousStepHandler = () => {
    if (steps <= 1) return;
    setSteps((step) => step - 1);
  };

  const nextStepHandler = () => {
    if (steps >= 3) return;
    setSteps((step) => step + 1);
  };

  console.log(steps);

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setClose(!close);
        }}
      >
        x
      </button>
      {close && (
        <div className="steps">
          <div className="numbers">
            <div className={`${steps >= 1 ? "active" : ""}`}>1</div>
            <div className={`${steps >= 2 ? "active" : ""}`}>2</div>
            <div className={`${steps >= 3 ? "active" : ""}`}>3</div>
          </div>
          <p className="message">
            Step {steps} : {messages[steps - 1]}{" "}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#FFF" }}
              onClick={previousStepHandler}
            >
              Prvious
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#FFF" }}
              onClick={nextStepHandler}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
