export type RouteLeg = {
  mode: string;
  line: string;
  fromStop: string;
  toStop: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
};

export type RoutePlan = {
  id: string;
  summary: string;
  totalDurationMinutes: number;
  totalCostEur: number;
  legs: RouteLeg[];
  isEstimate: boolean;
  advisory?: string;
};

export type CommuteAlert = {
  severity: 'good' | 'watch' | 'warn' | 'critical' | 'info';
  message: string;
  nowDurationMinutes: number | null;
  baselineDurationMinutes: number | null;
  deltaMinutes: number | null;
  nextDepartureTime: string | null;
  score: number;
  generatedAt: string;
};
