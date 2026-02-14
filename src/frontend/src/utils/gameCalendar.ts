/**
 * In-game calendar utility for converting simulation days to Gregorian dates.
 * Anchored at 1970-01-01 (day 1) and supports dates through 5000-12-31.
 * Uses proleptic Gregorian calendar with standard leap year rules.
 */

export interface DateParts {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

const EPOCH_YEAR = 1970;
const MAX_YEAR = 5000;

/**
 * Check if a year is a leap year using Gregorian calendar rules
 */
function isLeapYear(year: number): boolean {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

/**
 * Get the number of days in a given month for a given year
 */
function getDaysInMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

/**
 * Get the number of days in a given year
 */
function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

/**
 * Convert simulation day (1-based) to Gregorian date parts
 * Day 1 = 1970-01-01
 */
export function dayToDateParts(day: number): DateParts {
  if (day < 1) {
    throw new Error('Day must be >= 1');
  }

  let remainingDays = day - 1; // Convert to 0-based for calculation
  let year = EPOCH_YEAR;

  // Find the year
  while (year <= MAX_YEAR) {
    const daysThisYear = getDaysInYear(year);
    if (remainingDays < daysThisYear) {
      break;
    }
    remainingDays -= daysThisYear;
    year++;
  }

  if (year > MAX_YEAR) {
    // Cap at max supported date
    return { year: MAX_YEAR, month: 12, day: 31 };
  }

  // Find the month and day within the year
  let month = 1;
  while (month <= 12) {
    const daysThisMonth = getDaysInMonth(year, month);
    if (remainingDays < daysThisMonth) {
      break;
    }
    remainingDays -= daysThisMonth;
    month++;
  }

  const dayOfMonth = remainingDays + 1; // Convert back to 1-based

  return { year, month, day: dayOfMonth };
}

/**
 * Convert simulation day to calendar year only
 */
export function dayToYear(day: number): number {
  return dayToDateParts(day).year;
}

/**
 * Format date parts as a human-readable string
 * Example: "Jan 1, 1970"
 */
export function formatDate(dateParts: DateParts): string {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthName = monthNames[dateParts.month - 1];
  return `${monthName} ${dateParts.day}, ${dateParts.year}`;
}

/**
 * Format simulation day as a human-readable date string
 */
export function formatDay(day: number): string {
  const dateParts = dayToDateParts(day);
  return formatDate(dateParts);
}

/**
 * Format date parts as ISO-style date string
 * Example: "1970-01-01"
 */
export function formatDateISO(dateParts: DateParts): string {
  const month = dateParts.month.toString().padStart(2, '0');
  const day = dateParts.day.toString().padStart(2, '0');
  return `${dateParts.year}-${month}-${day}`;
}
