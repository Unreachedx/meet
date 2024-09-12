import React, { useState } from 'react';
import './NumberOfEvents.css';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;

    // Allow only numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setNumber(value);
      setCurrentNOE(value);
    }

    let errorText = '';

    // Check if the value is empty, not a number, or less than or equal to 0
    if (value === '' || Number(value) <= 0) {
      errorText = 'Please enter a valid number greater than 0.';
    } else {
      errorText = '';
    }

    // Handle error display (if you want to show error messages somewhere in your UI)
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
