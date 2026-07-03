import { getUserFriendlyErrorMessage } from '../error-message';

describe('getUserFriendlyErrorMessage', () => {
  it('returns default message when error is empty', () => {
    expect(getUserFriendlyErrorMessage()).toBe('Something went wrong. Please try again.');
    expect(getUserFriendlyErrorMessage(null)).toBe('Something went wrong. Please try again.');
  });

  it('maps network related errors', () => {
    expect(getUserFriendlyErrorMessage('Network request failed')).toBe(
      'Network error. Please check your internet connection and try again.',
    );
  });

  it('maps timeout errors', () => {
    expect(getUserFriendlyErrorMessage('Request timeout')).toBe(
      'The request took too long. Please try again.',
    );
  });

  it('maps not found errors', () => {
    expect(getUserFriendlyErrorMessage('404 not found')).toBe(
      'The requested Pokémon could not be found.',
    );
  });

  it('returns generic message for unknown errors', () => {
    expect(getUserFriendlyErrorMessage('Unexpected crash')).toBe(
      'Something went wrong. Please try again.',
    );
  });
});
