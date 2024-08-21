import React from 'react';

const NumberOfEvents = ({ eventCount, setEventCount }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventCount(Number(value)); // Ensure the value is treated as a number
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        role="textbox"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
