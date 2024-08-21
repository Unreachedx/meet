import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import { extractLocations, getEvents } from '../api';


describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const cityTextBox = screen.getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setCity={() => {}} />);

    const cityTextBox = screen.getByRole('textbox');
    fireEvent.focus(cityTextBox);

    // Wait for suggestions to be visible
    const suggestionList = await screen.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setCity={() => {}} />);

    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

    // Wait for list items to appear
    await waitFor(() => {
      const suggestionListItems = screen.getAllByRole('listitem');
      const suggestions = allLocations.filter(location =>
        location.toUpperCase().includes('BERLIN')
      );

      // +1 for "See all cities"
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);

      suggestions.forEach((suggestion, index) => {
        expect(suggestionListItems[index].textContent).toBe(suggestion);
      });

      // Ensure "See all cities" is the last item
      expect(suggestionListItems[suggestions.length].textContent).toBe('See all cities');
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setCity={() => {}} />);

    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

    // Wait for list items to appear
    const suggestionListItems = await screen.findAllByRole('listitem');
    const BerlinGermanySuggestion = suggestionListItems[0]; // Adjust based on actual suggestion

    await userEvent.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});