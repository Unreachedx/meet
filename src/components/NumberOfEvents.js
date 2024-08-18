import React, { useState } from 'react';

const NumberOfEvents = ({ defaultValue = 32 }) => {
  const [eventCount, setEventCount] = useState(defaultValue);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setEventCount(value);
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