import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import { expect, it, describe } from 'vitest'

describe('<App />', () => {
  it('renders a card selector', () => {
    render(<App />)
    const cardSelectorElement = screen.getByTestId('card-selector-panel')
    expect(cardSelectorElement).toBeInTheDocument()
  })

  it('renders a big card', () => {
    render(<App />)
    const bigCardElement = screen.getByTestId('front-card')
    expect(bigCardElement).toBeInTheDocument()
  })

  it('renders a card with a number', () => {
    render(<App />)
    const cardElement = screen.getByText('8')
    expect(cardElement).toBeInTheDocument()
  })

  it('renders a card with a symbol', () => {
    render(<App />)
    const cardElement = screen.getByText('∞')
    expect(cardElement).toBeInTheDocument()
  })

  it('renders a card with a question mark', () => {
    render(<App />)
    const cardElement = screen.getByText('?')
    expect(cardElement).toBeInTheDocument()
  })

  it('when a card is clicked, the big card is flipped', async () => {
    render(<App />)
    const cardElement = screen.getByText('8')
    userEvent.click(cardElement)
    await waitFor(() => {
      expect(screen.getAllByText('?')).toHaveLength(2)
    })
    const bigCardElement = await screen.findByTestId('front-card')
    userEvent.click(bigCardElement)

    await waitFor(async () => {
      expect(bigCardElement).toHaveClass('flipped')
    })
  })
})
