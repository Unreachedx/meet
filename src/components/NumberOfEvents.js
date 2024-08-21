import React from 'react';
import './NumberOfEvents.css'; // Import the CSS file for styling

const NumberOfEvents = ({ eventCount, setEventCount }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventCount(Number(value)); // Ensure the value is treated as a number
  };

  return (
    <div className="number-of-events-container">
      <input
        type="number"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;