import React, { useState, useEffect } from "react";
import "./CitySearch.css";

const CitySearch = ({
  handleSearchChange,
  setShowSuggestions,
  query,
  showSuggestions,
  suggestions,
  handleSuggestionClicked,
  handleSeeAllClicked,
  allLocations, // Make sure allLocations is passed as a prop
  setSuggestions, // Also include setSuggestions as a prop
}) => {
  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]); // Correctly reference allLocations

  return (
    <div className="city-search-container">
      <input
        type="text"
        className="city-input"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleSearchChange}
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
