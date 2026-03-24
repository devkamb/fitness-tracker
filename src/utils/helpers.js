import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, getDay, isWithinInterval } from 'date-fns';
import { USER, WORKOUTS, MEALS } from './constants';

export function formatDate(date) {
  return format(typeof date === 'string' ? parseISO(date) : date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date) {
  return format(typeof date === 'string' ? parseISO(date) : date, 'EEEE, MMMM d');
}

export function getDayOfWeek(dateStr) {
  const d = parseISO(dateStr);
  return format(d, 'EEEE').toLowerCase();
}

export function isWorkoutDay(dateStr) {
  const day = getDayOfWeek(dateStr);
  return ['monday', 'tuesday', 'thursday', 'saturday'].includes(day);
}

export function getWorkoutForDay(dateStr) {
  const day = getDayOfWeek(dateStr);
  return WORKOUTS[day] || null;
}

export function isSaturday(dateStr) {
  const d = parseISO(dateStr);
  return getDay(d) === 6;
}

export function isSunday(dateStr) {
  const d = parseISO(dateStr);
  return getDay(d) === 0;
}

export function getMealsForDay(dateStr) {
  const sat = isSaturday(dateStr);
  return [
    MEALS.meal1,
    MEALS.meal2,
    sat ? MEALS.meal3_saturday : MEALS.meal3_weekday,
    MEALS.meal4,
  ];
}

export function getWeekNumber(dateStr) {
  const start = parseISO(USER.startDate);
  const current = parseISO(dateStr);
  const diff = differenceInDays(current, start);
  if (diff < 0) return 0;
  return Math.floor(diff / 7) + 1;
}

export function getWeekDates(dateStr) {
  const d = parseISO(dateStr);
  const start = startOfWeek(d, { weekStartsOn: 1 });
  const end = endOfWeek(d, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(formatDate);
}

export function isWeighDay(dateStr) {
  const day = getDayOfWeek(dateStr);
  return ['monday', 'wednesday', 'friday'].includes(day);
}

export function getStreakCount(allDays) {
  if (!allDays || allDays.length === 0) return 0;
  const sorted = [...allDays]
    .filter(d => d.allComplete)
    .map(d => d.id)
    .sort()
    .reverse();

  if (sorted.length === 0) return 0;

  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff = differenceInDays(parseISO(sorted[i]), parseISO(sorted[i + 1]));
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function isInProgramRange(dateStr) {
  const d = parseISO(dateStr);
  const start = parseISO(USER.startDate);
  const end = parseISO(USER.endDate);
  return isWithinInterval(d, { start, end });
}

export function getDayData(dateStr) {
  return {
    id: dateStr,
    meals: { meal1: false, meal2: false, meal3: false, meal4: false },
    supplements: { multivitamin: false, calcium: false },
    morningRoutine: {},
    steps: false,
    bedtime: false,
    meal3Manual: { calories: '', protein: '' },
    allComplete: false,
  };
}
