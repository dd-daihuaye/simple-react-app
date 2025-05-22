import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first card', () => {
  render(<App />);
  const card = screen.getByText(/Card 1/i);
  expect(card).toBeInTheDocument();
});
