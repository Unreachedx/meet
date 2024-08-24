import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

test('contains an input element with the role of textbox', () => {
  const { getByRole } = render(<NumberOfEvents />);
  const inputElement = getByRole('spinbutton');
  expect(inputElement).toBeInTheDocument();
});

test('default value of input field is 32', () => {
  const { getByRole } = render(<NumberOfEvents eventCount={32} setEventCount={() => {}} />);
  const inputElement = getByRole('spinbutton');
  expect(inputElement).toHaveValue(32);
});

test('input field value changes when user types', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<NumberOfEvents eventCount={10} setEventCount={() => {}} />);
  const inputElement = getByRole('spinbutton');

  // Clear the input field before typing
  fireEvent.change(inputElement, { target: { value: '' } });

  // Simulate typing '10' into the input field
  fireEvent.change(inputElement, { target: { value: '10' } });

  // Assert that the value of the input field has changed to '10'
  expect(inputElement).toHaveValue(10);
});