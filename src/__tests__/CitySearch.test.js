import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    const { getByRole } = render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const cityTextBox = getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const { queryByRole } = render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const suggestionList = queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { getByRole, findByRole } = render(<CitySearch allLocations={allLocations} setCity={() => {}} />);
    const cityTextBox = getByRole('textbox');

    fireEvent.click(cityTextBox);
    const suggestionList = await findByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { getByRole, findAllByRole } = render(<CitySearch allLocations={allLocations} setCity={() => {}} />);

    const cityTextBox = getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

    const suggestions = allLocations.filter(location => location.toUpperCase().includes('BERLIN'));

    const suggestionListItems = await findAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // +1 for "See all cities"
    
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { getByRole, findAllByRole } = render(<CitySearch allLocations={allLocations} setCity={() => {}} />);
    
    const cityTextBox = getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });
    const BerlinGermanySuggestion = suggestions[0];
    
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
