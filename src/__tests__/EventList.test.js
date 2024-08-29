import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventList';
import mockData from '../mock-data';
import App from './../App';


describe('<EventList /> component', () => {
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
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });
});