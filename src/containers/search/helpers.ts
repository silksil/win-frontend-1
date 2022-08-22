import { format } from 'date-fns';

const formatDisplayDate = (date) => {
  const dayNumber = format(date, 'dd');
  const dayName = format(date, 'EEEE');
  const shortendDayName = dayName.slice(0, 3);
  const month = format(date, 'LLLL');
  const shortendMonth = month.slice(0, 3);

  const displayedDate = `${shortendDayName}, ${shortendMonth} ${dayNumber}`;
  return displayedDate;
};

export const startDateDisplay = (dateRange) => {
  const startDate = dateRange[0].startDate;

  if (!startDate) return 'Check-in';

  return formatDisplayDate(startDate);
};

export const endDateDisplay = (dateRange) => {
  const startDate = dateRange[0].endDate;

  if (!startDate) return 'Check-out';

  return formatDisplayDate(startDate);
};