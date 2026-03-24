export const USER = {
  name: 'Prashanth',
  startWeight: 225,
  goalWeight: 197,
  height: '5\'10"',
  startDate: '2026-03-31',
  endDate: '2026-07-20',
  totalWeeks: 16,
};

export const DAILY_TARGETS = {
  calories: 2028,
  saturdayCaloriesMin: 2800,
  saturdayCaloriesMax: 3200,
  protein: 227,
  steps: 10000,
};

export const WORKOUTS = {
  monday: {
    name: 'Push',
    day: 'Monday',
    exercises: [
      { id: 'bench_press', name: 'Bench Press', sets: 4, repsRange: '6-8' },
      { id: 'incline_db_press', name: 'Incline DB Press', sets: 3, repsRange: '8-10' },
      { id: 'overhead_press', name: 'Overhead Press', sets: 3, repsRange: '8-10' },
      { id: 'lateral_raises', name: 'Lateral Raises', sets: 3, repsRange: '12-15' },
      { id: 'tricep_dips', name: 'Tricep Dips', sets: 3, repsRange: '8-10' },
      { id: 'overhead_tricep_ext', name: 'Overhead Tricep Extension', sets: 3, repsRange: '10-12' },
    ],
  },
  tuesday: {
    name: 'Pull',
    day: 'Tuesday',
    exercises: [
      { id: 'deadlifts', name: 'Deadlifts', sets: 4, repsRange: '5-6' },
      { id: 'barbell_rows', name: 'Barbell Rows', sets: 3, repsRange: '8-10' },
      { id: 'pullups', name: 'Pull-ups/Lat Pulldowns', sets: 3, repsRange: '8-12' },
      { id: 'seated_cable_rows', name: 'Seated Cable Rows', sets: 3, repsRange: '10-12' },
      { id: 'barbell_curls', name: 'Barbell Curls', sets: 3, repsRange: '8-10' },
      { id: 'hammer_curls', name: 'Hammer Curls', sets: 3, repsRange: '10-12' },
    ],
  },
  thursday: {
    name: 'Legs',
    day: 'Thursday',
    exercises: [
      { id: 'back_squats', name: 'Back Squats', sets: 4, repsRange: '6-8' },
      { id: 'romanian_deadlifts', name: 'Romanian Deadlifts', sets: 3, repsRange: '8-10' },
      { id: 'leg_press', name: 'Leg Press', sets: 3, repsRange: '10-12' },
      { id: 'leg_curls', name: 'Leg Curls', sets: 3, repsRange: '10-12' },
      { id: 'lunges', name: 'Lunges', sets: 3, repsRange: '10 each leg' },
      { id: 'calf_raises', name: 'Calf Raises', sets: 4, repsRange: '15-20' },
    ],
  },
  saturday: {
    name: 'Upper',
    day: 'Saturday',
    exercises: [
      { id: 'incline_bench', name: 'Incline Bench Press', sets: 3, repsRange: '8-10' },
      { id: 'cable_flyes', name: 'Cable/DB Flyes', sets: 3, repsRange: '12-15' },
      { id: 'pullups_sat', name: 'Pull-ups/Pulldowns', sets: 3, repsRange: '8-12' },
      { id: 'face_pulls', name: 'Face Pulls', sets: 3, repsRange: '15-20' },
      { id: 'arnold_press', name: 'Arnold Press', sets: 3, repsRange: '10-12' },
      { id: 'cable_curls', name: 'Cable Curls', sets: 3, repsRange: '12-15' },
      { id: 'tricep_pushdowns', name: 'Tricep Pushdowns', sets: 3, repsRange: '12-15' },
    ],
  },
};

// ============================================================
// FULL DAILY SCHEDULES
// ============================================================

const WORKOUT_MORNING = [
  { id: 'wake', time: '5:50 AM', task: 'Wake up, chug 16 oz water immediately', cat: 'routine' },
  { id: 'banana_caffeine', time: '6:00 AM', task: 'Eat 1 banana + 200mg caffeine', cat: 'routine' },
  { id: 'dress', time: '6:00 AM', task: 'Get dressed (gym clothes laid out night before)', cat: 'routine' },
  { id: 'leave', time: '6:15 AM', task: 'Leave for gym', cat: 'routine' },
  { id: 'arrive', time: '6:20 AM', task: 'Arrive at gym', cat: 'gym' },
  { id: 'warmup_cardio', time: '6:20 AM', task: '5 min light cardio warm-up', cat: 'gym' },
  { id: 'warmup_stretch', time: '6:25 AM', task: 'Dynamic stretching', cat: 'gym' },
  { id: 'warmup_specific', time: '6:30 AM', task: 'Movement-specific warm-up', cat: 'gym' },
];

const WORKOUT_POST = [
  { id: 'workout_done', time: '7:30 AM', task: 'Workout complete \u2014 head home', cat: 'gym' },
  { id: 'meal1', time: '7:35 AM', task: 'MEAL 1: 2 scoops whey + 2 tbsp PB + 1 banana + psyllium', cat: 'meal', mealId: 'meal1', calories: 565, protein: 51 },
  { id: 'supps', time: '7:35 AM', task: 'Multivitamin + Calcium pill', cat: 'supplement' },
  { id: 'shower', time: '7:40 AM', task: 'Shower', cat: 'routine' },
  { id: 'start_day', time: '8:00 AM', task: 'Start day (classes, ViralPilot, O-1A prep)', cat: 'routine' },
];

const STD_AFTERNOON = [
  { id: 'meal2', time: '12:00 PM', task: 'MEAL 2: 285g chicken + 175g rice + 1 banana', cat: 'meal', mealId: 'meal2', calories: 723, protein: 76 },
  { id: 'continue', time: '12:30 PM', task: 'Continue work/classes', cat: 'routine' },
  { id: 'meal3', time: '6:00 PM', task: 'MEAL 3: 285g chicken + 260g rice + 1 banana', cat: 'meal', mealId: 'meal3', calories: 828, protein: 78 },
  { id: 'evening', time: '6:30 PM', task: 'Evening activities', cat: 'routine' },
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 10,000? If not, go walk', cat: 'goal' },
  { id: 'meal4', time: '10:00 PM', task: 'MEAL 4: 1 scoop whey in water', cat: 'meal', mealId: 'meal4', calories: 120, protein: 24 },
  { id: 'wind_down', time: '10:30 PM', task: 'Wind down (no screens, dim lights)', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED \u2014 set 2 alarms for 5:50 AM', cat: 'sleep' },
];

const MON_EX = [
  { id: 'ex_bench', time: '6:35 AM', task: 'Bench Press: 4\u00D76-8 (2-3 min rest)', cat: 'exercise' },
  { id: 'ex_incline', time: '6:50 AM', task: 'Incline DB Press: 3\u00D78-10 (2 min rest)', cat: 'exercise' },
  { id: 'ex_ohp', time: '7:00 AM', task: 'Overhead Press: 3\u00D78-10 (2 min rest)', cat: 'exercise' },
  { id: 'ex_lateral', time: '7:10 AM', task: 'Lateral Raises: 3\u00D712-15 (90s rest)', cat: 'exercise' },
  { id: 'ex_dips', time: '7:18 AM', task: 'Tricep Dips: 3\u00D78-10 (90s rest)', cat: 'exercise' },
  { id: 'ex_ext', time: '7:25 AM', task: 'Overhead Tricep Ext: 3\u00D710-12 (90s rest)', cat: 'exercise' },
];

const TUE_EX = [
  { id: 'ex_dl', time: '6:35 AM', task: 'Deadlifts: 4\u00D75-6 (3 min rest)', cat: 'exercise' },
  { id: 'ex_rows', time: '6:50 AM', task: 'Barbell Rows: 3\u00D78-10 (2 min rest)', cat: 'exercise' },
  { id: 'ex_pull', time: '7:00 AM', task: 'Pull-ups/Pulldowns: 3\u00D78-12 (2 min rest)', cat: 'exercise' },
  { id: 'ex_cable', time: '7:10 AM', task: 'Seated Cable Rows: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_curl', time: '7:18 AM', task: 'Barbell Curls: 3\u00D78-10 (90s rest)', cat: 'exercise' },
  { id: 'ex_hammer', time: '7:25 AM', task: 'Hammer Curls: 3\u00D710-12 (90s rest)', cat: 'exercise' },
];

const THU_EX = [
  { id: 'ex_squat', time: '6:35 AM', task: 'Back Squats: 4\u00D76-8 (3 min rest)', cat: 'exercise' },
  { id: 'ex_rdl', time: '6:50 AM', task: 'Romanian Deadlifts: 3\u00D78-10 (2 min rest)', cat: 'exercise' },
  { id: 'ex_legpress', time: '7:00 AM', task: 'Leg Press: 3\u00D710-12 (2 min rest)', cat: 'exercise' },
  { id: 'ex_curl', time: '7:10 AM', task: 'Leg Curls: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_lunge', time: '7:18 AM', task: 'Lunges: 3\u00D710 each leg (90s rest)', cat: 'exercise' },
  { id: 'ex_calf', time: '7:25 AM', task: 'Calf Raises: 4\u00D715-20 (60s rest)', cat: 'exercise' },
];

const SAT_EX = [
  { id: 'ex_incbench', time: '6:35 AM', task: 'Incline Bench: 3\u00D78-10 (2 min rest)', cat: 'exercise' },
  { id: 'ex_fly', time: '6:45 AM', task: 'Cable/DB Flyes: 3\u00D712-15 (90s rest)', cat: 'exercise' },
  { id: 'ex_pull', time: '6:53 AM', task: 'Pull-ups/Pulldowns: 3\u00D78-12 (2 min rest)', cat: 'exercise' },
  { id: 'ex_face', time: '7:03 AM', task: 'Face Pulls: 3\u00D715-20 (90s rest)', cat: 'exercise' },
  { id: 'ex_arnold', time: '7:11 AM', task: 'Arnold Press: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_ccurl', time: '7:19 AM', task: 'Cable Curls: 3\u00D712-15 (60s rest)', cat: 'exercise' },
  { id: 'ex_push', time: '7:25 AM', task: 'Tricep Pushdowns: 3\u00D712-15 (60s rest)', cat: 'exercise' },
];

const SAT_EVE = [
  { id: 'meal2', time: '12:00 PM', task: 'MEAL 2: 285g chicken + 175g rice + 1 banana', cat: 'meal', mealId: 'meal2', calories: 723, protein: 76 },
  { id: 'afternoon', time: '12:30 PM', task: 'Afternoon (prep for date, work)', cat: 'routine' },
  { id: 'opt_whey', time: '4:00 PM', task: 'Optional: 1 scoop whey if hungry', cat: 'routine' },
  { id: 'date_prep', time: '6:00 PM', task: 'Get ready for date', cat: 'routine' },
  { id: 'meal3_date', time: '7:00 PM', task: 'DATE NIGHT: Dinner out \u2014 aim 1,200-1,800 cal', cat: 'meal', mealId: 'meal3' },
  { id: 'date_cont', time: '9:00 PM', task: 'Date continues (movie, walk)', cat: 'routine' },
  { id: 'meal4_maybe', time: '11:00 PM', task: 'Home \u2014 small whey if hungry', cat: 'meal', mealId: 'meal4', calories: 120, protein: 24 },
  { id: 'bed_sat', time: '11:30 PM', task: 'BED', cat: 'sleep' },
];

const REST_MORN = [
  { id: 'wake', time: '6:30 AM', task: 'Wake up (no gym \u2014 sleep in)', cat: 'routine' },
  { id: 'water', time: '6:30 AM', task: 'Chug 16 oz water', cat: 'routine' },
  { id: 'meal1', time: '7:00 AM', task: 'MEAL 1: 2 scoops whey + 2 tbsp PB + 1 banana + psyllium', cat: 'meal', mealId: 'meal1', calories: 565, protein: 51 },
  { id: 'supps', time: '7:00 AM', task: 'Multivitamin + Calcium pill', cat: 'supplement' },
  { id: 'shower', time: '7:15 AM', task: 'Shower, get ready', cat: 'routine' },
  { id: 'start_day', time: '8:00 AM', task: 'Start day (school, ViralPilot, O-1A)', cat: 'routine' },
];

const REST_AFT = [
  { id: 'meal2', time: '12:00 PM', task: 'MEAL 2: 285g chicken + 175g rice + 1 banana', cat: 'meal', mealId: 'meal2', calories: 723, protein: 76 },
  { id: 'continue', time: '12:30 PM', task: 'Continue work/classes', cat: 'routine' },
  { id: 'meal3', time: '6:00 PM', task: 'MEAL 3: 285g chicken + 260g rice + 1 banana', cat: 'meal', mealId: 'meal3', calories: 828, protein: 78 },
];

const REST_NIGHT = [
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 10,000?', cat: 'goal' },
  { id: 'meal4', time: '10:00 PM', task: 'MEAL 4: 1 scoop whey in water', cat: 'meal', mealId: 'meal4', calories: 120, protein: 24 },
  { id: 'wind_down', time: '10:30 PM', task: 'Wind down', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED', cat: 'sleep' },
];

export const DAILY_SCHEDULES = {
  monday: [...WORKOUT_MORNING, ...MON_EX, ...WORKOUT_POST, ...STD_AFTERNOON],
  tuesday: [...WORKOUT_MORNING, ...TUE_EX, ...WORKOUT_POST, ...STD_AFTERNOON],
  wednesday: [
    ...REST_MORN,
    ...REST_AFT,
    { id: 'evening', time: '6:30 PM', task: 'Evening work/study', cat: 'routine' },
    { id: 'opt_walk', time: '7:00 PM', task: 'Optional: 20-30 min walk (hit steps)', cat: 'routine' },
    ...REST_NIGHT,
  ],
  thursday: [
    ...WORKOUT_MORNING.map(t =>
      t.id === 'warmup_stretch' ? { ...t, task: 'Dynamic stretching (focus legs/hips)' } :
      t.id === 'warmup_specific' ? { ...t, task: 'Bodyweight squats, leg swings warm-up' } : t
    ),
    ...THU_EX, ...WORKOUT_POST, ...STD_AFTERNOON,
  ],
  friday: [
    ...REST_MORN,
    { id: 'weigh_in', time: '7:00 AM', task: 'WEIGH YOURSELF (before eating \u2014 log it)', cat: 'goal' },
    ...REST_AFT,
    { id: 'evening', time: '7:00 PM', task: 'Evening activities (friends, ViralPilot)', cat: 'routine' },
    ...REST_NIGHT,
  ],
  saturday: [...WORKOUT_MORNING, ...SAT_EX, ...WORKOUT_POST, ...SAT_EVE],
  sunday: [
    { id: 'wake', time: '7:00 AM', task: 'Wake up (no alarm, sleep in)', cat: 'routine' },
    { id: 'water', time: '7:00 AM', task: 'Chug water', cat: 'routine' },
    { id: 'meal1', time: '7:30 AM', task: 'MEAL 1: 2 scoops whey + 2 tbsp PB + 1 banana + psyllium', cat: 'meal', mealId: 'meal1', calories: 565, protein: 51 },
    { id: 'supps', time: '7:30 AM', task: 'Multivitamin + Calcium pill', cat: 'supplement' },
    { id: 'weigh_sun', time: '7:30 AM', task: 'Weigh yourself (higher from Sat \u2014 normal)', cat: 'goal' },
    { id: 'shower', time: '8:00 AM', task: 'Shower, relax', cat: 'routine' },
    { id: 'free', time: '9:00 AM', task: 'Free time (ViralPilot, relax)', cat: 'routine' },
    { id: 'meal2', time: '12:00 PM', task: 'MEAL 2: 285g chicken + 175g rice + 1 banana', cat: 'meal', mealId: 'meal2', calories: 723, protein: 76 },
    { id: 'prep_chill', time: '1:00 PM', task: 'Relax, prep for meal prep', cat: 'routine' },
    { id: 'grocery', time: '2:00 PM', task: 'GROCERY: 8.5 lbs chicken, 21 bananas, restock if needed', cat: 'prep' },
    { id: 'home', time: '2:45 PM', task: 'Home from store', cat: 'prep' },
    { id: 'mp_start', time: '3:00 PM', task: 'MEAL PREP \u2014 preheat oven 375\u00B0F', cat: 'prep' },
    { id: 'mp_season', time: '3:05 PM', task: 'Season chicken (salt, pepper, garlic)', cat: 'prep' },
    { id: 'mp_oven', time: '3:15 PM', task: 'Chicken in oven 25-30 min \u2014 prep containers', cat: 'prep' },
    { id: 'mp_done_cook', time: '3:45 PM', task: 'Chicken done, rest 5 min', cat: 'prep' },
    { id: 'mp_portion', time: '3:50 PM', task: 'Portion into 21 containers (285g each)', cat: 'prep' },
    { id: 'mp_store', time: '4:30 PM', task: 'Store containers in fridge', cat: 'prep' },
    { id: 'mp_clean', time: '4:45 PM', task: 'Clean up kitchen', cat: 'prep' },
    { id: 'mp_complete', time: '5:00 PM', task: 'MEAL PREP DONE', cat: 'prep' },
    { id: 'meal3', time: '6:00 PM', task: 'MEAL 3: 285g chicken + 260g rice + 1 banana', cat: 'meal', mealId: 'meal3', calories: 828, protein: 78 },
    { id: 'evening', time: '6:30 PM', task: 'Free time (ViralPilot, O-1A, relax)', cat: 'routine' },
    { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 10,000?', cat: 'goal' },
    { id: 'prep_mon', time: '9:00 PM', task: 'Prep Monday: gym clothes, water bottle', cat: 'routine' },
    { id: 'review', time: '9:30 PM', task: 'Review week: weight log, workout numbers', cat: 'routine' },
    { id: 'meal4', time: '10:00 PM', task: 'MEAL 4: 1 scoop whey in water', cat: 'meal', mealId: 'meal4', calories: 120, protein: 24 },
    { id: 'wind_down', time: '10:30 PM', task: 'Wind down (good sleep = good Monday)', cat: 'routine' },
    { id: 'bed', time: '11:00 PM', task: 'BED \u2014 ready to crush next week', cat: 'sleep' },
  ],
};

export const PROGRESS_PHOTO_DATES = [
  '2026-03-30', '2026-04-13', '2026-04-27', '2026-05-11',
  '2026-05-25', '2026-06-08', '2026-06-22', '2026-07-06', '2026-07-20',
];

export const MILESTONE_MESSAGES = {
  7: "One week strong! You're building a habit.",
  14: "Two weeks! The hardest part is behind you.",
  21: "Three weeks \u2014 this is becoming who you are.",
  30: "A full month! Incredible discipline.",
  45: "45 days! You're halfway to a new you.",
  60: "Two months of consistency. Unstoppable.",
  75: "75 days! Hard challenge complete.",
  90: "Three months. Look how far you've come.",
  100: "Triple digits! Legend status.",
  112: "16 weeks. You did it. Transformation complete.",
};
