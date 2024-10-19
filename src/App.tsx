import { useState } from 'react'
import './App.css'
import { SelectedCard } from './SelectedCard'

// Fibonacci sequence
const fibonacciSequence = [0, '½', 1, 2, 3, 5, 8, 13, 21, '∞', '?']
export type Card = (typeof fibonacciSequence)[number]

function App() {
  const [selectedCard, setSelectedCard] = useState<Card>('?')

  const handleCardSelection = (card: Card) => () => {
    setSelectedCard(card)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Planning Poker</h1> */}
        <SelectedCard selectedCard={selectedCard} />
        <div className="card-container" data-testid="card-selector">
          {fibonacciSequence.map((number) => (
            <button key={number} className="card" onClick={handleCardSelection(number)}>
              {number}
            </button>
          ))}
        </div>
      </header>
    </div>
  )
}

export default App
