import { useState } from 'react'
import type { Card } from '../App'
import './CardSelectorPanel.scss'

const fibonacciSequence = [0, '½', 1, 2, 3, 5, 8, 13, 21, '∞', '?']

export const CardSelectorPanel = ({
  onCardSelection,
}: {
  onCardSelection: (card: Card) => void
}) => {
  const [fullSize, setFullSize] = useState(false)

  const cardSelect = (card: Card) => {
    onCardSelection(card)
    setFullSize(false)
  }

  return (
    <div
      className={`card-selector-panel ${fullSize ? 'full-size' : 'shrink'}`}
      data-testid="card-selector-panel"
    >
      <div className="top-panel">
        <button className="expand-btn" onClick={() => setFullSize(!fullSize)}>
          {fullSize ? '↓' : '↑'}
        </button>
      </div>
      {fibonacciSequence.map((card) => (
        <button key={card} className="card" onClick={() => cardSelect(card)}>
          {card}
        </button>
      ))}
    </div>
  )
}
