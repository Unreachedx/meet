import React, { useState } from 'react';
import './NumberOfEvents.css';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;

    // Allow only numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setNumber(value);
    }

    let errorText = '';

    // Check if the value is empty, not a number, or less than or equal to 0
    if (isNaN(value) || Number(value) <= 0) {
      errorText = 'Please enter a valid number greater than 0.';
    } else {
      setCurrentNOE(Number(value)); // Only set number of events if input is valid
    }

    setErrorAlert(errorText);
  };

  return (
    <div className="number-of-events-container">
      <label className="noe" htmlFor="numberOfEventsInput">
        Number of Events:
      </label>
      <input
        id="numberOfEventsInput"
        type="text"
        value={number}
        onChange={handleInputChanged}
        placeholder="Enter a number"
      />
    </div>
  );
};

export default NumberOfEvents;