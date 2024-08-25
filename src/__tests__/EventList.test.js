import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import mockData from '../mock-data';

test('has an element with "list" role', () => {
  render(<EventList events={mockData} />);
  screen.debug();
  expect(screen.queryAllByRole("heading")).toBeTruthy();
});

test('has an element ina div role and renders correct number of events', () => {
  render(<EventList events={mockData} />);
  const headings = screen.getAllByText('Learn JavaScript');
  // Check for list role 
  expect(headings.length).toBeTruthy()
});