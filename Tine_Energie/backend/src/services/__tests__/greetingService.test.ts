import { getGreeting } from '../greetingService';

describe('greetingService', () => {
  it('returns default greeting when no name provided', () => {
    expect(getGreeting()).toBe('Hello from TypeScript backend!');
  });

  it('returns personalized greeting', () => {
    expect(getGreeting('Jest')).toBe('Hello from Jest!');
  });
});
