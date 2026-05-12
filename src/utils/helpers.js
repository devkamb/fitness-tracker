import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, getDay, isWithinInterval } from 'date-fns';
import { USER, WORKOUTS, DAILY_SCHEDULES, DAILY_TARGETS, PROGRESS_PHOTO_DATES, GF_BIRTHDAY_SCHEDULE, MONDAY_VEG_SCHEDULE } from './constants';

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

// ============================================================
// 16-WEEK PLAN LOGIC: refeeds, deload
// ============================================================

// Refeed every 5 days starting from Day 1.
// Day 1 = Mar 30 (refeed), Day 6 = Apr 4 (refeed), etc.
export function isRefeedDay(dateStr) {
  const base = parseISO(USER.refeedBaseDate);
  const current = parseISO(dateStr);
  const diff = differenceInDays(current, base);
  if (diff < 0) return false;
  return diff % 5 === 0;
}

// Deload week
export function isDeloadWeek(dateStr) {
  const current = parseISO(dateStr);
  const start = parseISO(USER.deloadStart);
  const end = parseISO(USER.deloadEnd);
  return isWithinInterval(current, { start, end });
}

// ============================================================
// SCHEDULE: apply refeed modifications at runtime
// ============================================================

function applyRefeedMods(schedule, dayOfWeek) {
  // v3 refeed: +100g rice to chicken meals, +50g rice to whey snacks,
  // 2 bananas pre-workout (training), +banana to evening snack
  const isTraining = ['monday', 'tuesday', 'thursday', 'saturday'].includes(dayOfWeek);
  const eveningSnackId = isTraining ? 'meal5' : 'meal4';

  return schedule.map(task => {
    if (task.cat !== 'meal' || !task.task) return task;

    // Chicken curry meals: +100g cooked rice
    if (task.task.includes('chicken curry')) {
      return {
        ...task,
        task: task.task + ' + 100g cooked rice',
        carbs: (task.carbs || 0) + 28,
        calories: (task.calories || 0) + 130,
      };
    }

    // Pre-workout banana (training only): upgrade to 2 bananas
    if (isTraining && task.mealId === 'meal1' && task.task.includes('banana')) {
      return {
        ...task,
        task: 'MEAL 1 (pre-workout): 2 bananas 236g (REFEED)',
        carbs: (task.carbs || 0) + 25,
        calories: (task.calories || 0) + 105,
        protein: (task.protein || 0) + 1,
      };
    }

    // Evening whey snack: +50g rice + 1 banana
    if (task.mealId === eveningSnackId && task.task.includes('whey')) {
      return {
        ...task,
        task: task.task + ' + 50g cooked rice + 1 banana (REFEED)',
        carbs: (task.carbs || 0) + 39,
        calories: (task.calories || 0) + 170,
        protein: (task.protein || 0) + 1,
      };
    }

    // Afternoon whey snack: +50g rice
    if (task.task.includes('45g whey') && task.task.includes('PB')) {
      return {
        ...task,
        task: task.task + ' + 50g cooked rice',
        carbs: (task.carbs || 0) + 14,
        calories: (task.calories || 0) + 65,
      };
    }

    return task;
  });
}

export function isGfBirthday(dateStr) {
  return dateStr === USER.gfBirthday;
}

export function getScheduleForDay(dateStr) {
  // May 17: girlfriend's birthday special
  if (isGfBirthday(dateStr)) return GF_BIRTHDAY_SCHEDULE;
  // Apr 30 only: one-time vegetarian Monday
  if (dateStr === USER.mondayVegDate) return MONDAY_VEG_SCHEDULE;

  const day = getDayOfWeek(dateStr);
  let schedule = DAILY_SCHEDULES[day] || [];

  if (isRefeedDay(dateStr)) {
    schedule = applyRefeedMods(schedule, day);
  }
  return schedule;
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

// Get time status for a task
export function getTimeStatus(taskTime, dateStr) {
  const now = new Date();
  const today = formatDate(now);
  if (dateStr !== today) return 'future';

  const nowMins = now.getHours() * 60 + now.getMinutes();
  const taskMins = parseTimeToMinutes(taskTime);

  if (nowMins >= taskMins + 30) return 'past';
  if (nowMins >= taskMins - 30 && nowMins < taskMins) return 'upcoming';
  if (nowMins >= taskMins && nowMins < taskMins + 30) return 'current';
  return 'future';
}

// Get daily macro targets
export function getDayTargets(dateStr) {
  // Apr 30 one-time veg day
  if (dateStr === USER.mondayVegDate) {
    return { ...DAILY_TARGETS.monday_veg, steps: DAILY_TARGETS.steps };
  }
  if (isRefeedDay(dateStr)) {
    return { ...DAILY_TARGETS.refeed, steps: DAILY_TARGETS.steps };
  }
  const day = getDayOfWeek(dateStr);
  if (['monday', 'tuesday', 'thursday', 'saturday'].includes(day)) {
    return { ...DAILY_TARGETS.training, steps: DAILY_TARGETS.steps };
  }
  return { ...DAILY_TARGETS.rest, steps: DAILY_TARGETS.steps };
}

// Calculate totals from checked tasks in the schedule
export function calcMacrosFromChecked(schedule, checked) {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  schedule.forEach(t => {
    if (t.cat === 'meal' && checked[t.id] && t.calories) {
      calories += t.calories;
      protein += (t.protein || 0);
      carbs += (t.carbs || 0);
      fat += (t.fat || 0);
    }
  });
  return { calories, protein, carbs, fat };
}

export function getDaysUntilGraduation(dateStr) {
  const grad = parseISO(USER.graduationDate || USER.endDate);
  const current = dateStr ? parseISO(dateStr) : new Date();
  return Math.max(0, differenceInDays(grad, current));
}

export function getDaysUntilShredEnd(dateStr) {
  const end = parseISO(USER.shredEndDate || USER.endDate);
  const current = dateStr ? parseISO(dateStr) : new Date();
  return Math.max(0, differenceInDays(end, current));
}

export function getWeeksRemaining(dateStr) {
  const days = getDaysUntilShredEnd(dateStr);
  return Math.ceil(days / 7);
}

export function getDayData(dateStr) {
  const isTraining = isWorkoutDay(dateStr);
  // Training days: 6 meals, Rest days: 5 meals
  const meals = isTraining
    ? { meal1: false, meal2: false, meal3: false, meal4: false, meal5: false, meal6: false }
    : { meal1: false, meal2: false, meal3: false, meal4: false, meal5: false };
  return {
    id: dateStr,
    checked: {},
    meals,
    supplements: {},
    morningRoutine: {},
    steps: false,
    bedtime: false,
    allComplete: false,
  };
}
