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

  it('renders no big card initially', () => {
    render(<App />)
    const bigCardElement = screen.queryByTestId('front-card')

    expect(bigCardElement).not.toBeInTheDocument()
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

  it('should render a big card showing the back of the card, when a card is selected', async () => {
    render(<App />)
    const cardElement = screen.getByText('8')
    userEvent.click(cardElement)
    const bigCardElement = await screen.findByTestId('front-card')
    expect(bigCardElement).not.toHaveClass('flipped')
  })

  it('flips the big card when it is clicked', async () => {
    render(<App />)
    const cardElement = screen.getByText('8')
    userEvent.click(cardElement)
    const bigCardElement = await screen.findByTestId('front-card')
    userEvent.click(bigCardElement)

    await waitFor(async () => {
      expect(bigCardElement).toHaveClass('flipped')
    })
  })
})
