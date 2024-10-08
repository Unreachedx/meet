import React, { useState } from 'react';
import './Event.css';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="event-container" data-testid="event"> {/* Use div or other element */}
      <h2 className="eventHeader">{event && event.summary}</h2>
      <p>{event && event.location}</p>
      <p>{event && new Date(event.created).toUTCString()}</p>
      {showDetails && (
        <p className="details">{event && event.description}</p>
      )}
      <button
        className="details-button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
    </div>
  );
};

export default Event;