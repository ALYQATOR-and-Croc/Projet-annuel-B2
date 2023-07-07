export interface CalendarGET {
  userId: number;
  timeRange: CalendarTimeRange;
  startDate: Date;
  endDate: Date;
}
type CalendarTimeRange = 'MONTH' | 'DAY' | 'WEEK';
