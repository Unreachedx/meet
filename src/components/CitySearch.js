import React, { useState } from "react";
import './CitySearch.css';

const CitySearch = ({ allLocations, setCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? Array.from(new Set(
          allLocations.filter((location) =>
            location.toUpperCase().includes(value.toUpperCase())
          )
        ))
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleSuggestionClicked = (suggestion) => {
    setQuery(suggestion);
    setCity(suggestion);
    setShowSuggestions(false);
  };

  const handleSeeAllClicked = () => {
    setQuery("");
    setCity("");
    setShowSuggestions(false);
  };

  return (
    <div className="city-search-container">
      <input
        type="text"
        className="city-input"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="suggestion-item"
              onClick={() => handleSuggestionClicked(suggestion)}
            >
              {suggestion}
            </div>
          ))}
          <div className="suggestion-item" onClick={handleSeeAllClicked}>
            <b>See all cities</b>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
