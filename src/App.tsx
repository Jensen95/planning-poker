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
      <ShakeButton />
      {/* <h1>Planning Poker</h1> */}
      <SelectedCard selectedCard={selectedCard} />
      <CardSelectorPanel onCardSelection={setSelectedCard} />
    </div>
  )
}
type PermissionRequestFn = () => Promise<PermissionState>
type DME = typeof DeviceMotionEvent & { requestPermission: PermissionRequestFn }

const checkPermission = async () => {
  try {
    if (typeof (DeviceMotionEvent as DME).requestPermission === 'function') {
      const permissionState = await (DeviceMotionEvent as DME).requestPermission()
      return permissionState === 'granted'
    }
    return true
  } catch {
    return false
  }
}

const ShakeButton = () => {
  if (
    !('DeviceMotionEvent' in window) ||
    typeof (DeviceMotionEvent as DME).requestPermission !== 'function'
  ) {
    return null
  }

  return <button onClick={checkPermission}>Shake it up?</button>
}

export default App
