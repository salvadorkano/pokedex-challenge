export function getUserFriendlyErrorMessage(error?: string | null): string {
  if (!error) {
    return 'Something went wrong. Please try again.';
  }

  const normalized = error.toLowerCase();

  if (
    normalized.includes('network') ||
    normalized.includes('internet') ||
    normalized.includes('connection') ||
    normalized.includes('fetch')
  ) {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (normalized.includes('timeout')) {
    return 'The request took too long. Please try again.';
  }

  if (normalized.includes('not found') || normalized.includes('404')) {
    return 'The requested Pokémon could not be found.';
  }

  return 'Something went wrong. Please try again.';
}
