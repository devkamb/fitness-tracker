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
  bedtime: '11:00 PM',
};

export const MEALS = {
  meal1: {
    id: 'meal1',
    name: 'Meal 1',
    time: '7:35 AM',
    description: '2 scoops whey + 2 tbsp PB + 1 banana + psyllium',
    calories: 565,
    protein: 51,
  },
  meal2: {
    id: 'meal2',
    name: 'Meal 2',
    time: '12:00 PM',
    description: '285g chicken breast + 175g rice + 1 banana',
    calories: 723,
    protein: 76,
  },
  meal3_weekday: {
    id: 'meal3',
    name: 'Meal 3',
    time: '6:00 PM',
    description: '285g chicken breast + 260g rice + 1 banana',
    calories: 828,
    protein: 78,
  },
  meal3_saturday: {
    id: 'meal3',
    name: 'Meal 3 (Date Night)',
    time: '7:00 PM',
    description: 'Dinner out with girlfriend',
    calories: null, // manual entry
    protein: null,
  },
  meal4: {
    id: 'meal4',
    name: 'Meal 4',
    time: '10:00 PM',
    description: '1 scoop whey in water',
    calories: 120,
    protein: 24,
  },
};

export const SUPPLEMENTS = [
  { id: 'multivitamin', name: 'Multivitamin', time: '7:35 AM' },
  { id: 'calcium', name: 'Calcium pill', time: '7:35 AM' },
];

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

export const MORNING_ROUTINE_WORKOUT = [
  { id: 'wake_up', name: 'Wake up, chug 16 oz water', time: '5:50 AM' },
  { id: 'pre_workout_snack', name: 'Eat banana + caffeine', time: '6:00 AM' },
  { id: 'drive_gym', name: 'Drive to gym', time: '6:15 AM' },
];

export const MORNING_ROUTINE_REST = [
  { id: 'wake_up', name: 'Wake up, chug 16 oz water', time: '7:00 AM' },
];

export const MILESTONE_MESSAGES = {
  7: "One week strong! You're building a habit.",
  14: "Two weeks! The hardest part is behind you.",
  21: "Three weeks — this is becoming who you are.",
  30: "A full month! Incredible discipline.",
  45: "45 days! You're halfway to a new you.",
  60: "Two months of consistency. Unstoppable.",
  75: "75 days! Hard challenge complete.",
  90: "Three months. Look how far you've come.",
  100: "Triple digits! Legend status.",
  112: "16 weeks. You did it. Transformation complete.",
};

export const GROCERY_LIST = [
  '8.5 lbs chicken breast',
  '21 bananas',
  'Cook and portion chicken into 21 containers',
];
