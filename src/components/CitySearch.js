import React, { useState } from "react";

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
    setCity(suggestion); // Update the city in the parent component
    setShowSuggestions(false);
  };

  const handleSeeAllClicked = () => {
    setQuery("");
    setCity(""); // Clear city filter
    setShowSuggestions(false);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key="See all cities" onClick={handleSeeAllClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
