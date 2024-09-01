
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  test('has an element with "textbox" role', () => {
    render(
      <NumberOfEvents setCurrentNOE={() => {}}/> 
    );
    const textbox = screen.queryByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default number of elements should be 32', () => {
    render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} /> // dummy prop passed so that it is defined
    );
    const textbox = screen.queryByRole('textbox');
    expect(textbox).toHaveValue('32');
  });
});
