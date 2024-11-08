import { useState } from 'react'
import './App.scss'
import { SelectedCard } from './SelectedCard'
import { CardSelectorPanel } from './CardSelectorPanel'
import { ShakeButton } from './ShakeButton'

// Fibonacci sequence
const fibonacciSequence = [0, '½', 1, 2, 3, 5, 8, 13, 21, '∞', '?']
export type Card = (typeof fibonacciSequence)[number]

function App() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  return (
    <div className="App">
      <ShakeButton />
      <SelectedCard selectedCard={selectedCard} />
      <CardSelectorPanel onCardSelection={setSelectedCard} />
    </div>
  )
}

export default App
