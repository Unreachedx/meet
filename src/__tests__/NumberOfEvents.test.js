
import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen, userEvent, waitFor } from '@testing-library/react';
import App from '../App';

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


describe('Integration Tests', () => {
  test('allows the user to specify the number of events', async () => {
    render(<App />);

    const numberOfEventsInput = screen.getByLabelText(/number of events/i);

    // Simulate deleting the default value "32" and typing "10"
    await userEvent.clear(numberOfEventsInput);
    await userEvent.type(numberOfEventsInput, '10');

    // Assuming that the API call is mocked and returns a predictable number of events
    await waitFor(() => {
      const events = screen.getAllByTestId('event'); // Adjust selector based on your implementation
      expect(events.length).toBe(10); // Verifies that 10 events are shown
    });
  });
});