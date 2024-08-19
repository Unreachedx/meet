import React, { useEffect, useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';


const App = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents().then(results => {
      setEvents(results)
    }).catch(error => console.log('An error occured while fetching events'))
  })
  return (
    <div className="App">
      <CitySearch />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
}

export default App;