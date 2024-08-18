import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Event from '../components/Event';
import mockData from '../mock-data';

// Extract the first event from mock data for testing
const event = mockData[0];

test('shows event details when "Show Details" button is clicked', () => {
  render(<Event event={event} />);
  
  // Check if the title, start time, and location are present
  const titleElement = screen.getByText(event.title);
  const startTimeElement = screen.getByText(event.date); // Adjust based on your actual prop names
  const locationElement = screen.getByText(event.location); // Adjust based on your actual prop names
  const buttonElement = screen.getByText('Show Details');

  expect(titleElement).toBeInTheDocument();
  expect(startTimeElement).toBeInTheDocument();
  expect(locationElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);

  const detailsElement = screen.getByText(event.description);
  expect(detailsElement).toBeInTheDocument();

  const hideButtonElement = screen.getByText('Hide Details');
  expect(hideButtonElement).toBeInTheDocument();
});

test('hides event details when "Hide Details" button is clicked', () => {
  render(<Event event={event} />);
  
  const showButtonElement = screen.getByText('Show Details');
  fireEvent.click(showButtonElement);

  const hideButtonElement = screen.getByText('Hide Details');
  fireEvent.click(hideButtonElement);

  const detailsElement = screen.queryByText(event.description);
  expect(detailsElement).not.toBeInTheDocument();

  const showButtonElementAgain = screen.getByText('Show Details');
  expect(showButtonElementAgain).toBeInTheDocument();
});
