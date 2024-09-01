import React from 'react';
import { render, within, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city-input');
  });

  test('suggestions list is hidden by default', () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const suggestionList = queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    await fireEvent.focus(cityTextBox);
    const suggestionList = queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
  
    // Initial render with no locations
    const { rerender, queryAllByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
      />
    );
  
    // Rerender with actual locations after user types "Berlin"
    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
      />
    );
  
    const cityTextBox = screen.getByRole('textbox'); // Use screen to query by role
  
    // Simulate typing "Berlin" in the city textbox
    await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

    await fireEvent.focus(cityTextBox)
  
    // Filter allLocations to those matching "Berlin"
    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );
  
    // Get all <li> elements inside the suggestion list
    const suggestionListItems = queryAllByRole('listitem');
  
    // Expect the number of list items to match the filtered suggestions length + 1 for "See all cities"
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
  
    // Check that each suggestion matches the text content of the <li> elements
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { rerender, queryByRole, queryAllByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
      />
    );

    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

    await fireEvent.focus(cityTextBox)

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = queryAllByRole('listitem')[0];

    await fireEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
