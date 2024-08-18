import React, { useState } from 'react';

const Event = ({ event }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <li>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && <p>{event.description}</p>}
    </li>
  );
};

export default Event;
