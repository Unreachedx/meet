import React, { useState } from 'react';

const Event = ({ event }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { summary, start: { dateTime, timeZone }, description } = event;

  const toggleDetails = () => {
    console.log('Button clicked');
    setDetailsVisible(prevState => !prevState);
  };

  return (
    <li>
      <h3>{summary}</h3>
      <p>{dateTime} {`(${timeZone})`}</p>
      <button onClick={toggleDetails}>
        {detailsVisible ? 'Hide Details' : 'Show Details'}
      </button>
      {detailsVisible && <p>{description}</p>}
    </li>
  );
};

export default Event;