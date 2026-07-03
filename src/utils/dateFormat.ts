/**
 * Converts an <input type="month"> value ("YYYY-MM") to a display string ("Jan 2025").
 * Passes through any value that doesn't match the YYYY-MM pattern (e.g. "Present", "").
 */
export function formatMonthYear(value: string): string {
  if (!value) return '';
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return value; // already a display string or empty
  const [, yearStr, monthStr] = match;
  const date = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Formats a date range for display (e.g. "Jan 2022 – Present" or "Jan 2022 – Dec 2024").
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  current: boolean
): string {
  const start = formatMonthYear(startDate);
  const end = current ? 'Present' : formatMonthYear(endDate);
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
}
