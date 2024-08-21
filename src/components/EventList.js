import React from 'react';
import Event from './Event';
import './EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list-container">
      {events.map(event => <Event key={event.id} event={event} />)}
    </div>
  );
};

export default EventList;