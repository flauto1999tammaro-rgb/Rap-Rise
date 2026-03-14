import { estimateFare } from './fareRules.js';

const mapLegMode = (mode) => {
  switch (mode) {
    case 'BUS':
      return 'bus';
    case 'TRAM':
      return 'tram';
    case 'SUBWAY':
    case 'METRO':
      return 'metro';
    case 'RAIL':
      return 'rail';
    case 'FUNICULAR':
      return 'funicolare';
    case 'WALK':
      return 'walk';
    default:
      return 'bus';
  }
};

const formatTime = (millis) => {
  const date = new Date(millis);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}:00`;
};

export const mapOtpPlan = (otpPlan) => {
  if (!otpPlan?.plan?.itineraries?.length) {
    return [];
  }

  return otpPlan.plan.itineraries.map((itinerary, index) => {
    const legs = itinerary.legs.map((leg) => {
      const mode = mapLegMode(leg.mode);
      return {
        mode,
        line: leg.routeShortName || leg.routeLongName || leg.mode,
        fromStop: leg.from?.name || 'Origine',
        toStop: leg.to?.name || 'Destinazione',
        startTime: formatTime(leg.startTime),
        endTime: formatTime(leg.endTime),
        durationMinutes: Math.max(1, Math.round(leg.duration / 60)),
      };
    });

    const modes = legs.map((leg) => leg.mode).filter((mode) => mode !== 'walk');
    const fare = estimateFare(modes);

    return {
      id: `otp-${index}`,
      summary: `${legs[0]?.fromStop || 'Origine'} -> ${legs.at(-1)?.toStop || 'Destinazione'}`,
      totalDurationMinutes: Math.max(1, Math.round(itinerary.duration / 60)),
      totalCostEur: fare.amount,
      isEstimate: fare.isEstimate,
      legs,
    };
  });
};
