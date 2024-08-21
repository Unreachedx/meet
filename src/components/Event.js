import React, { useState } from 'react';

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
    <li>
      <h3>{summary}</h3>
      <p>{dateTime} ({timeZone})</p>
      <p>{location}</p>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && <p>{description}</p>}
    </li>
  );
};

export default Event;