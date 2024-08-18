import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Event from '../components/Event';
import mockData from '../mock-data';

// Extract the first event from mock data for testing
const event = mockData[0];

test('renders event title', () => {
  render(<Event event={event} />);
  
  // Assert that the title is rendered
  const titleElement = screen.queryByText(event.summary);
  expect(titleElement).toBeInTheDocument();
});

test('renders event start time', () => {
  render(<Event event={event} />);
  
  // Assert that the start time is rendered
  const startTimeElement = screen.queryByText(new Date(event.start.dateTime).toLocaleString());
  expect(startTimeElement).toBeInTheDocument();
});

test('renders event location', () => {
  render(<Event event={event} />);
  
  // Assert that the location is rendered
  const locationElement = screen.queryByText(event.location);
  expect(locationElement).toBeInTheDocument();
});

test('renders show details button', () => {
  render(<Event event={event} />);
  
  // Assert that the show details button is rendered
  const buttonElement = screen.queryByText('Show Details');
  expect(buttonElement).toBeInTheDocument();
});

// Optional: Verify that elements are present using querySelector
test('renders event details with querySelector', () => {
  render(<Event event={event} />);
  
  // Assert that elements are rendered using querySelector
  const titleElement = document.querySelector('.event-title');
  const startTimeElement = document.querySelector('.event-start-time');
  const locationElement = document.querySelector('.event-location');
  const buttonElement = document.querySelector('.show-details-button');

  expect(titleElement).toBeInTheDocument();
  expect(startTimeElement).toBeInTheDocument();
  expect(locationElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
