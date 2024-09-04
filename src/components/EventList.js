import React from 'react';
import Event from './Event';
import './EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list-container">
      <ul className="event-list">
        {events
          ? events.map((event) => (
              <li className="event-content" key={event.id}>
                <Event event={event} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default EventList;