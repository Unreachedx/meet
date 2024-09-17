import React from 'react';
import { render, within, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  const mockSetInfoAlert = jest.fn();

  test('renders text input', () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
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
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
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
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
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

    const { rerender, queryAllByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
      />
    );

    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
      />
    );

    const cityTextBox = screen.getByRole('textbox');

    await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });
    await fireEvent.focus(cityTextBox);

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    const suggestionListItems = queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);

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
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
      />
    );

    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={mockSetInfoAlert} // Pass mock function here
      />
    );
    const cityTextBox = queryByRole('textbox');
    await fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });
    await fireEvent.focus(cityTextBox);

    const BerlinGermanySuggestion = queryAllByRole('listitem')[0];
    await fireEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
