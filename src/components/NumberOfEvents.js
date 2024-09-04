import React, { useState } from 'react';
import './NumberOfEvents.css';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32); // Default value
  const [errorText, setErrorText] = useState('');

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setNumber(value);

    if (value === '' || isNaN(value) || Number(value) <= 0) {
      setErrorText('Please enter a valid number greater than 0.');
    } else {
      setErrorText('');
      setCurrentNOE(Number(value)); // Ensure the value passed is a number
    }
  };

  return (
    <div className="number-of-events-container">
      <label className="noe" htmlFor="numberOfeventsInput">
        Number of Events: 
      </label>
      <input
        id="numberOfeventsInput"
        type="text"
        value={number}
        onChange={handleInputChanged}
        aria-describedby="numberOfEventsError" // For accessibility
      />
      {errorText && (
        <div id="numberOfEventsError" className="error-text">
          {errorText}
        </div>
      )}
    </div>
  );
};

export default NumberOfEvents;