import dayjs from 'dayjs';

export function getSecondBetweenTwoDates(startDate: Date, endDate: Date): number {
  const start = dayjs(endDate);
  const seconds = start.diff(startDate, 'second', true);

  return seconds;
}
