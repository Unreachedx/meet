import React, { useState } from 'react';
import './Event.css';

const Event = ({ event }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Destructuring with fallback values
  const { summary, start, description, location } = event;
  const dateTime = start?.dateTime || 'No date/time available';
  const timeZone = start?.timeZone || 'No timezone available';

  const toggleDetails = () => {
    setDetailsVisible(prevState => !prevState);
  };

  return (
    <div className="event-content">
      <h3>{summary}</h3>
      <p>{dateTime} ({timeZone})</p>
      <p>{location}</p>
      {detailsVisible && <p>{description}</p>}
      <button className="details-button" onClick={toggleDetails}>
        {detailsVisible ? 'hide details' : 'show details'}
      </button>
    </div>
  );
};

export default Event;
