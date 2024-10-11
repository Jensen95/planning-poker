import React, { useState } from "react";
import "./App.css";

// Fibonacci sequence
const fibonacciSequence = [0, "½", 1, 2, 3, 5, 8, 13, 21, "∞", "?"];

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | number | null>(
    null
  );

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Planning Poker</h1> */}
        <div
          className={`big-card ${isFlipped ? "flipped" : ""}`}
          onClick={handleCardClick}
        >
          <div className="front">👻</div>
          <div className="back">{selectedCard}</div>
        </div>
        <div className="card-container">
          {fibonacciSequence.map((number) => (
            <div
              key={number}
              className="card"
              onClick={() => setSelectedCard(number)}
            >
              {number}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
