import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;
    setNumber(value);

    let errorText = '';

    // Check if the value is empty, not a number, or less than or equal to 1
    if (value === '' || isNaN(value) || Number(value) <= 0) {
      errorText = 'Please enter a valid number greater than 1.';
    } else {
      errorText = '';
    }

    setCurrentNOE(value);
  };

  return (
    <div className="number-of-events-container">
      <label className="noe" htmlFor="numberOfeventsInput">
        Number of Events: {''}
      </label>
      <input
        type="text"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
