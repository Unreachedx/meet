import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
    const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
});

test('has an element with "list" role and renders correct number of events', () => {
  const events = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const { getByRole, getAllByRole } = render(<EventList events={events} />);
  
  // Check for list role
  expect(getByRole('list')).toBeInTheDocument();
  
  // Check number of events
  expect(getAllByRole('listitem')).toHaveLength(events.length);
});
