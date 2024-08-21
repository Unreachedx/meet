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

  useEffect(() => {
    getEvents().then(results => {
      setEvents(results);
    }).catch(error => console.error('An error occurred while fetching events:', error));
  }, []);

  const filteredEvents = events
    .filter(event => city === '' || event.location.toLowerCase().includes(city.toLowerCase()))
    .slice(0, eventCount);

  return (
    <div className="App">
      <CitySearch allLocations={events.map(event => event.location)} setCity={setCity} />
      
      <NumberOfEvents eventCount={eventCount} setEventCount={setEventCount} />
      
      <EventList events={filteredEvents} />
    </div>
  );
};

export default App;