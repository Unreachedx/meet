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

    const CitySearchDOM = AppDOM.querySelector('#city-search-container');
    expect(CitySearchDOM).toBeInTheDocument(); // Ensure CitySearchDOM is found

    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    expect(CitySearchInput).toBeInTheDocument(); // Ensure input is found

    if (CitySearchInput) {
      fireEvent.change(CitySearchInput, { target: { value: 'Berlin' } });
    }

    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    expect(berlinSuggestionItem).toBeInTheDocument(); // Ensure suggestion item is found

    if (berlinSuggestionItem) {
      await user.click(berlinSuggestionItem);
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