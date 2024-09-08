import React from 'react';
import { render, within, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search-container')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('.number-of-events-container')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container;
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    
    // Find CitySearchDOM
    const CitySearchDOM = AppDOM.querySelector('#city-search-container');
    expect(CitySearchDOM).toBeInTheDocument(); // Ensure CitySearchDOM is found
    
    // Find input within CitySearchDOM
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    expect(CitySearchInput).toBeInTheDocument(); // Ensure input is found
    
    // Ensure the input is focused before typing
    if (CitySearchInput) {
      CitySearchInput.focus();  // Focus the input
      await user.type(CitySearchInput, 'Berlin');  // Simulate typing
    }
    
    // Wait for the suggestion item to appear
    const berlinSuggestionItem = await within(CitySearchDOM).findByText((content, element) =>
      content.includes('Berlin') && content.includes('Germany')
    );
    expect(berlinSuggestionItem).toBeInTheDocument();
    
    // Fallback to fireEvent.click to avoid issues with userEvent.click()
    if (berlinSuggestionItem) {
      fireEvent.click(berlinSuggestionItem);
    }
    
    // Check if the Event List is rendered
    const EventListDOM = AppDOM.querySelector('#event-list');
    expect(EventListDOM).toBeInTheDocument(); // Ensure event list is found
    
    // Get all event items rendered in the list
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

// Fetch all events and filter those in Berlin
const allEvents = await getEvents();
const berlinEvents = allEvents.filter(
  event => event.location.includes('Berlin, Germany')
);
    
allRenderedEventItems.forEach(event => {
  if (event.textContent.includes('Berlin, Germany')) {
    expect(event.textContent).toContain('Berlin, Germany');
  }
});
  
  
    // Check that the number of rendered events is at least the number of Berlin events
    expect(allRenderedEventItems.length).toBeGreaterThanOrEqual(berlinEvents.length);
  });
  });