import React, { useEffect, useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('');
  const [eventCount, setEventCount] = useState(32);

  const [filteredEvents, setFilteredEvents] = useState(events);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getEvents().then(results => {
      setEvents(results);
      setFilteredEvents(results)
    }).catch(error => console.error('An error occurred while fetching events:', error));
  }, []);

  const handleSearchChange = (e) => {
    const location = e.target.value;
    setCity(location);

    const filtered = events.filter((event) =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );

    setFilteredEvents(filtered);
  };

  const handleSeeAllClicked = () => {
    setQuery("");
    setCity("");
    setShowSuggestions(false);
  };

  const handleSuggestionClicked = (suggestion) => {
    setQuery(suggestion);
    setCity(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="App">
      <h1>Meet App</h1>
      <h3>Choose your Nearest City</h3>
      <CitySearch
          setCity={setCity} 
          handleSearchChange={handleSearchChange} 
          handleSeeAllClicked={handleSeeAllClicked}
          handleSuggestionClicked={handleSuggestionClicked}
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          setShowSuggestions={setShowSuggestions}
      />

      <NumberOfEvents eventCount={eventCount} setEventCount={setEventCount} />

      <EventList events={filteredEvents} />
    </div>
  );
};

export default App;