import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, getDay, isWithinInterval } from 'date-fns';
import { USER, WORKOUTS, DAILY_SCHEDULES, PROGRESS_PHOTO_DATES } from './constants';

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
  return getDay(parseISO(dateStr)) === 6;
}

export function isSunday(dateStr) {
  return getDay(parseISO(dateStr)) === 0;
}

export function getScheduleForDay(dateStr) {
  const day = getDayOfWeek(dateStr);
  return DAILY_SCHEDULES[day] || [];
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

export function isProgressPhotoDay(dateStr) {
  return PROGRESS_PHOTO_DATES.includes(dateStr);
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

// Parse "6:35 AM" into minutes since midnight
export function parseTimeToMinutes(timeStr) {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

// Get time status for a task: 'past', 'current', 'upcoming', 'future'
export function getTimeStatus(taskTime, dateStr) {
  const now = new Date();
  const today = formatDate(now);
  if (dateStr !== today) return 'future'; // not today, no highlighting

  const nowMins = now.getHours() * 60 + now.getMinutes();
  const taskMins = parseTimeToMinutes(taskTime);

  if (nowMins >= taskMins + 30) return 'past';
  if (nowMins >= taskMins - 30 && nowMins < taskMins) return 'upcoming';
  if (nowMins >= taskMins && nowMins < taskMins + 30) return 'current';
  return 'future';
}

// Calculate totals from checked tasks in the schedule
export function calcMacrosFromChecked(schedule, checked) {
  let calories = 0;
  let protein = 0;
  schedule.forEach(t => {
    if (t.cat === 'meal' && checked[t.id] && t.calories) {
      calories += t.calories;
      protein += (t.protein || 0);
    }
  });
  return { calories, protein };
}

export function getDayData(dateStr) {
  return {
    id: dateStr,
    checked: {},           // taskId -> boolean (for the full schedule)
    meals: { meal1: false, meal2: false, meal3: false, meal4: false },
    supplements: { multivitamin: false, calcium: false },
    morningRoutine: {},
    steps: false,
    bedtime: false,
    meal3Manual: { calories: '', protein: '' },
    allComplete: false,
  };
}
