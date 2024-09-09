import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

// Extract the first event from mock data for testing
const event = mockData[0];

test('shows and hides event details when buttons are clicked', () => {
  render(<Event event={event} />);

  // Check for the presence of the event details button (case insensitive)
  const showButtonElement = screen.getByText(/show details/i);
  fireEvent.click(showButtonElement);

  // Use a regex to match the description text more flexibly
  const detailsElement = screen.getByText(/Have you wondered how you can ask Google to show you the list of the top ten must-see places in London\?/i);
  expect(detailsElement).toBeInTheDocument();

  const hideButtonElement = screen.getByText(/hide details/i);
  fireEvent.click(hideButtonElement);

  expect(screen.queryByText(/Have you wondered how you can ask Google to show you the list of the top ten must-see places in London\?/i)).not.toBeInTheDocument();
  expect(screen.getByText(/show details/i)).toBeInTheDocument();
});

test('hides event details when "Hide Details" button is clicked', () => {
  render(<Event event={event} />);

  const showButtonElement = screen.getByText(/show details/i);
  fireEvent.click(showButtonElement);

  const hideButtonElement = screen.getByText(/hide details/i);
  fireEvent.click(hideButtonElement);

  const detailsElement = screen.queryByText(event.description);
  expect(detailsElement).not.toBeInTheDocument();

  const showButtonElementAgain = screen.getByText(/show details/i);
  expect(showButtonElementAgain).toBeInTheDocument();
});

