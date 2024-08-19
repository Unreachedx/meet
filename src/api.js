import mockData from './mock-data';

/**
 * Extracts locations from an array of events and removes duplicates.
 * @param {Array} events - Array of event objects.
 * @returns {Array} - Array of unique locations.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetches the list of events, optionally filtering by city and limiting by count.
 * @param {string} city - The city to filter events by (optional).
 * @param {number} count - The number of events to return (optional).
 * @returns {Promise<Array>} - A promise that resolves to an array of events.
 */
export const getEvents = async (city = '', count = 32) => {
  // Simulate fetching events from mock data
  let events = mockData;

  // Filter events by city if specified
  if (city && city !== 'See all cities') {
    events = events.filter(event => event.location.toLowerCase() === city.toLowerCase());
  }

  // Limit the number of events
  return events.slice(0, count);
};
