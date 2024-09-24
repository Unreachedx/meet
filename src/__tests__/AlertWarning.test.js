import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the navigator.onLine property
const mockNavigatorOnlineStatus = (status) => {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value: status,
  });
};

describe('WarningAlert functionality', () => {
  afterEach(() => {
    // Reset the online status after each test
    mockNavigatorOnlineStatus(true);
  });

  test('displays WarningAlert when offline', () => {
    // Simulate being offline
    mockNavigatorOnlineStatus(false);

    // Render the App
    render(<App />);

    // Check if the warning alert message appears
    const warningMessage = screen.getByText(/You are currently offline/i);
    expect(warningMessage).toBeInTheDocument();
  });

  test('does not display WarningAlert when online', () => {
    // Simulate being online
    mockNavigatorOnlineStatus(true);

    // Render the App
    render(<App />);

    // Check that the warning alert is not displayed
    const warningMessage = screen.queryByText(/You are currently offline/i);
    expect(warningMessage).not.toBeInTheDocument();
  });
});
