import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('renders MarkDown Previewer header', () => {
  render(<App />);
  const headerElement = screen.getByText(/MarkDown Previewer/i);
  expect(headerElement).toBeInTheDocument();
});