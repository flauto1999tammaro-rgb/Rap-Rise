const BASE_FARES = {
  bus: 1.4,
  metro: 1.6,
  tram: 1.4,
  funicolare: 1.6,
  rail: 2.0,
};

export const estimateFare = (modes = []) => {
  if (modes.length === 0) {
    return { amount: 0, isEstimate: true };
  }

  const base = modes.reduce((max, mode) => {
    const value = BASE_FARES[mode] ?? 1.5;
    return Math.max(max, value);
  }, 0);

  return { amount: base, isEstimate: true };
};
