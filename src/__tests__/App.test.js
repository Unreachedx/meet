import React from 'react';
import { render, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> integration', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container;
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();

    const CitySearchDOM = AppDOM.querySelector('#city-search-container');
    expect(CitySearchDOM).toBeInTheDocument(); // Ensure CitySearchDOM is found

    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    expect(CitySearchInput).toBeInTheDocument(); // Ensure input is found

    if (CitySearchInput) {
      fireEvent.change(CitySearchInput, { target: { value: 'Berlin' } });
    }

    // Log the HTML content of CitySearchDOM before querying for berlinSuggestionItem
    console.log(CitySearchDOM.innerHTML);

    const berlinSuggestionItem = AppDOM.querySelector('.city-suggestion');
    console.log(berlinSuggestionItem); // Check if the element is being found
    
    if (berlinSuggestionItem) {
      await user.click(berlinSuggestionItem);
    } else {
      // Wrap in waitFor to handle timing issues
      await waitFor(() => {
        const item = AppDOM.querySelector('.city-suggestion');
        expect(item).not.toBeNull();
      });
    }

    const EventListDOM = AppDOM.querySelector('#event-list');
    expect(EventListDOM).toBeInTheDocument(); // Ensure event list is found
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});