import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CitySearch from '../components/CitySearch';


describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const cityTextBox = screen.getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={[]} setCity={() => {}} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const mockHandleSearchChange = jest.fn();
    const mockSetShowSuggestions = jest.fn();
    const mockHandleSuggestionClicked = jest.fn();
    const mockHandleSeeAllClicked = jest.fn();
  
    const suggestions = ['London', 'Los Angeles', 'Lagos'];
  
    render(
      <CitySearch
        handleSearchChange={mockHandleSearchChange}
        setShowSuggestions={mockSetShowSuggestions}
        query="Lon"
        showSuggestions={true}
        suggestions={suggestions}
        handleSuggestionClicked={mockHandleSuggestionClicked}
        handleSeeAllClicked={mockHandleSeeAllClicked}
      />
    );
  
    const cityTextBox = screen.getByRole('textbox');
    fireEvent.focus(cityTextBox);
  
    const suggestionItems = screen.getAllByText('London');
    expect(suggestionItems.length).toBeTruthy();
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const mockHandleSearchChange = jest.fn();
    const mockSetShowSuggestions = jest.fn();
    const mockHandleSuggestionClicked = jest.fn();
    const mockHandleSeeAllClicked = jest.fn();
  
    const suggestions = ['London', 'Los Angeles', 'Lagos'];
    render(
      <CitySearch
        handleSearchChange={mockHandleSearchChange}
        setShowSuggestions={mockSetShowSuggestions}
        query="Lon"
        showSuggestions={true}
        suggestions={suggestions}
        handleSuggestionClicked={mockHandleSuggestionClicked}
        handleSeeAllClicked={mockHandleSeeAllClicked}
      />
    );
  
    const cityTextBox = screen.getByRole('textbox');
    fireEvent.change(cityTextBox, { target: { value: 'Lagos' } });
  
    // Wait for list items to appear
    await waitFor(() => {
      const citySuggestion = screen.getByText('Lagos');
      screen.debug();
      expect(citySuggestion).toBeTruthy();
    });
  });
});