import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

test('contains an input element with the role of textbox', () => {
  const { getByRole } = render(<NumberOfEvents />);
  const inputElement = getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('default value of input field is 32', () => {
  const { getByRole } = render(<NumberOfEvents />);
  const inputElement = getByRole('textbox');
  expect(inputElement).toHaveValue(32); // Ensure the expected value is a string
});

test('input field value changes when user types', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<NumberOfEvents />);
  const inputElement = getByRole('textbox');
  
  // Clear the input field before typing
  await user.clear(inputElement);
  
  // Simulate typing '10' into the input field
  await user.type(inputElement, '10');
  
  // Assert that the value of the input field has changed to '10'
  expect(inputElement).toHaveValue('10');
});
