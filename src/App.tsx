import { useState } from 'react'
import './App.css'
import { SelectedCard } from './SelectedCard'
import { CardSelectorPanel } from './CardSelectorPanel'

// Fibonacci sequence
const fibonacciSequence = [0, '½', 1, 2, 3, 5, 8, 13, 21, '∞', '?']
export type Card = (typeof fibonacciSequence)[number]

function App() {
  const [selectedCard, setSelectedCard] = useState<Card>('?')

  return (
    <div className="App">
      {/* <h1>Planning Poker</h1> */}
      <SelectedCard selectedCard={selectedCard} />
      <CardSelectorPanel onCardSelection={setSelectedCard} />
    </div>
  )
}

export default App
