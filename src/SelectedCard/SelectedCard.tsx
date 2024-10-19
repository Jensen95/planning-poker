import { useEffect, useState } from 'react'

import './SelectedCard.scss'

export const SelectedCard = ({ selectedCard }: { selectedCard: string | number }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [shownCards, setShownCards] = useState<(string | number)[]>([])

  useEffect(() => {
    setIsFlipped(false)
    if (selectedCard !== '') {
      setShownCards([...shownCards, selectedCard])
    }
  }, [selectedCard])

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div>
      <div className="card-stack">
        {shownCards.map((card, cardIndex, previousCards) => {
          const isLastCard = cardIndex === previousCards.length - 1
          return isLastCard ? (
            <div
              key={`${card}-${cardIndex}`}
              className={`big-card ${isFlipped ? 'flipped' : ''}`}
              onClick={handleCardClick}
              data-testid="big-card"
            >
              <div className="front">👻</div>
              <div className="back">{isFlipped ? selectedCard : ''}</div>
            </div>
          ) : (
            <FlippedCard key={`${card}-${cardIndex}`} card={card} />
          )
        })}
      </div>
    </div>
  )
}
const FlippedCard = ({ card }: { card: string | number }) => {
  return (
    <div className="big-card flipped stacked">
      <div className="front">👻</div>
      <div className="back">{card}</div>
    </div>
  )
}
