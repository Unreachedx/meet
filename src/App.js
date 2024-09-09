import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === 'See all cities' 
          ? allEvents 
          : allEvents.filter((event) => event.location === currentCity);
      const currentEvents = filteredEvents.slice(0, currentNOE);
      setEvents(currentEvents);
      setAllLocations(extractLocations(allEvents));
    };
  
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>Meet App</h1>
      <p className="choose">Choose your nearest city:</p>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
      />

      <EventList events={events} />
    </div>
  );
};

export default App;

import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
