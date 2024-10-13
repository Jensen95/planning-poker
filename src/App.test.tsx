import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders a card selector", () => {
  render(<App />);
  const cardSelectorElement = screen.getByTestId("card-selector");
  expect(cardSelectorElement).toBeInTheDocument();
});

test("renders a big card", () => {
  render(<App />);
  const bigCardElement = screen.getByTestId("big-card");
  expect(bigCardElement).toBeInTheDocument();
});

test("renders a card with a number", () => {
  render(<App />);
  const cardElement = screen.getByText("8");
  expect(cardElement).toBeInTheDocument();
});

test("renders a card with a symbol", () => {
  render(<App />);
  const cardElement = screen.getByText("∞");
  expect(cardElement).toBeInTheDocument();
});

test("renders a card with a question mark", () => {
  render(<App />);
  const cardElement = screen.getByText("?");
  expect(cardElement).toBeInTheDocument();
});

test("when a card is clicked, the big card is flipped", async () => {
  render(<App />);
  const cardElement = screen.getByText("8");
  userEvent.click(cardElement);
  const bigCardElement = await screen.findByTestId("big-card");
  expect(bigCardElement).not.toHaveClass("flipped");
  userEvent.click(bigCardElement);
  await waitFor(() => {
    expect(bigCardElement).toHaveClass("flipped");
  });
});
