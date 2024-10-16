import { useState } from "react";
import "./App.css";

// Fibonacci sequence
const fibonacciSequence = [0, "½", 1, 2, 3, 5, 8, 13, 21, "∞", "?"];
type Card = (typeof fibonacciSequence)[number];

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>("?");

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardSelection = (card: Card) => () => {
    setIsFlipped(false);
    setSelectedCard(card);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Planning Poker</h1> */}
        <div
          className={`big-card ${isFlipped ? "flipped" : ""}`}
          onClick={handleCardClick}
          data-testid="big-card"
        >
          <div className="front">👻</div>
          <div className="back">{isFlipped ? selectedCard : ""}</div>
        </div>
        <div className="card-container" data-testid="card-selector">
          {fibonacciSequence.map((number) => (
            <button
              key={number}
              className="card"
              onClick={handleCardSelection(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
