import { useCallback, useEffect, useState } from 'react'
import type { Card } from '../App'

import './SelectedCard.scss'
import { useDebounce, useMotion, useVibrate } from 'react-use'

export const SelectedCard = ({ selectedCard }: { selectedCard: Card | null }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const [shownCards, setShownCards] = useState<Card[]>([])

  useShake(() => {
    console.log('shake')
    setIsFlipped((prev) => !prev)
  }, selectedCard)

  useEffect(() => {
    setIsFlipped(false)
    if (selectedCard !== null) {
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
          if (card == null) {
            return null
          }
          const isLastCard = cardIndex === previousCards.length - 1
          return isLastCard ? (
            <div
              key={`${card}:${cardIndex}`}
              className={`big-card ${isFlipped ? 'flipped' : ''}`}
              onClick={handleCardClick}
              data-testid="front-card"
            >
              <div className="front">👻</div>
              <div className="back">{isFlipped ? selectedCard : ''}</div>
            </div>
          ) : (
            // Maybe remember if card is flipped
            <FlippedCard key={`${card}-${cardIndex}`} card={card} />
          )
        })}
      </div>
    </div>
  )
}

const getMaxAcceleration = (acceleration: {
  x: number | null
  y: number | null
  z: number | null
}): number => {
  let max = 0
  for (const key of ['x', 'y', 'z'] as const) {
    const value = Math.abs(acceleration?.[key] ?? 0)
    if (value > max) max = value
  }
  return max
}

const useShake = (onShake: () => void, card: Card | null) => {
  const motion = useMotion()
  const [shaking, setShaking] = useState(false)
  const [vibrate, setVibrate] = useState(false)
  // Throttle instead of debounce?
  // Use throttle/debounce on function not value
  useVibrate(vibrate, [100, 100, 100, 100], false)
  const [, cancelDebounce] = useDebounce(
    () => {
      setShaking((prev) => {
        if (prev) {
          onShake()
          setVibrate(true)
        }
        return false
      })
    },
    300,
    [shaking, card],
  )

  const max = getMaxAcceleration(motion?.acceleration)
  if (max > 15) {
    if (!shaking) {
      setShaking(true)
      setVibrate(false)
    }
  }

  useEffect(() => {
    cancelDebounce()
    setShaking(false)
    setVibrate(false)
  }, [card])

  return null
}

const FlippedCard = ({ card }: { card: Card }) => {
  return (
    <div className="big-card flipped stacked">
      <div className="front">👻</div>
      <div className="back">{card}</div>
    </div>
  )
}
