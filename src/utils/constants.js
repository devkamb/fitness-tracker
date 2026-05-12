export const USER = {
  name: 'Prashanth',
  age: 22,
  startWeight: 222,
  goalWeight: 172,
  height: '5\'11"',
  startDate: '2026-03-30',
  endDate: '2026-07-20',
  totalWeeks: 16,
  graduationDate: '2026-05-15',
  shredEndDate: '2026-07-20',
  bodyFatStart: 33,
  bodyFatGoal: 18,
  leanMassStart: 150,
  skeletalMuscle: 85,
  refeedBaseDate: '2026-03-30',
  deloadStart: '2026-05-19',
  deloadEnd: '2026-05-25',
  planV2Date: '2026-04-24',
  planV3Date: '2026-04-29', // banana pre-workout, whey+PB snacks
  gfBirthday: '2026-05-17',
  mondayVegDate: '2026-05-04', // one-time vegetarian Monday
};

// Targets per day type (v3 from Apr 29)
// Training: banana + 2x chicken+yogurt + 2x whey45+PB10 + psyllium
// Rest: 2x chicken+yogurt + 2x whey45+PB10 + psyllium
export const DAILY_TARGETS = {
  training: { calories: 1773, protein: 257, carbs: 37, fat: 49 },
  rest:     { calories: 1668, protein: 257, carbs: 12, fat: 46 },
  refeed:   { calories: 2253, protein: 257, carbs: 171, fat: 49 },
  monday_veg: { calories: 1605, protein: 266, carbs: 108, fat: 10 },
  steps: 15000,
  stepsMax: 18000,
};

// ============================================================
// WORKOUTS - Push/Pull/Legs/Upper 4x Split
// ============================================================

export const WORKOUTS = {
  monday: {
    name: 'Push',
    day: 'Monday',
    subtitle: 'Chest / Shoulders / Triceps',
    warmup: [
      'Arm circles: 20 forward, 20 backward',
      'Band pull-aparts: 2\u00D715',
      'Push-ups: 10 reps',
    ],
    exercises: [
      { id: 'db_bench', name: 'Dumbbell Bench Press', sets: 4, repsRange: '6-8', rest: '120 sec', note: 'Elbows 45\u00B0, full stretch. +5 lbs when 4\u00D78' },
      { id: 'incline_db', name: 'Incline DB Press (30-45\u00B0)', sets: 3, repsRange: '8-10', rest: '90 sec', note: '~70% of flat bench weight' },
      { id: 'ohp', name: 'Overhead Press (BB or DB)', sets: 3, repsRange: '6-8', rest: '120 sec', note: 'Core tight, no excessive arch' },
      { id: 'lateral_raises', name: 'Dumbbell Lateral Raises', sets: 3, repsRange: '12-15', rest: '60 sec', note: 'Slight elbow bend, raise to shoulder' },
      { id: 'dips', name: 'Assisted Dips (or CG Bench)', sets: 3, repsRange: '8-12', rest: '90 sec', note: 'Reduce assistance weekly' },
      { id: 'tri_pushdowns', name: 'Cable Tricep Pushdowns', sets: 3, repsRange: '12-15', rest: '60 sec', note: 'Elbows locked at sides' },
    ],
  },
  tuesday: {
    name: 'Pull',
    day: 'Tuesday',
    subtitle: 'Back / Biceps',
    warmup: [
      'Band pull-aparts: 20 reps',
      'Scapular pull-ups: 10 reps',
      'Dead hangs: 20 sec',
    ],
    exercises: [
      { id: 'pullups', name: 'Assisted Pull-ups (or Lat Pulldown)', sets: 4, repsRange: '6-10', rest: '120 sec', note: 'Shoulder-width overhand. Reduce assist weekly' },
      { id: 'bb_rows', name: 'Barbell Rows', sets: 4, repsRange: '6-8', rest: '120 sec', note: 'Hinge at hips, row to lower chest' },
      { id: 'cable_rows', name: 'Seated Cable Rows', sets: 3, repsRange: '10-12', rest: '90 sec', note: 'Squeeze blades, pull to sternum' },
      { id: 'face_pulls', name: 'Face Pulls', sets: 3, repsRange: '15-20', rest: '60 sec', note: 'Rear delts + posture' },
      { id: 'bb_curls', name: 'Barbell Curls', sets: 3, repsRange: '8-10', rest: '90 sec', note: 'No swinging, controlled' },
      { id: 'hammer_curls', name: 'Hammer Curls (DB)', sets: 3, repsRange: '10-12', rest: '60 sec', note: 'Neutral grip, palms facing' },
    ],
  },
  thursday: {
    name: 'Legs',
    day: 'Thursday',
    subtitle: 'Quads / Hamstrings / Glutes / Calves',
    warmup: [
      'Bodyweight squats: 15 reps',
      'Leg swings: 10 each leg',
      'Glute bridges: 15 reps',
    ],
    exercises: [
      { id: 'back_squats', name: 'Barbell Back Squats', sets: 4, repsRange: '6-8', rest: '150 sec', note: 'Break at hips+knees, parallel or below' },
      { id: 'rdls', name: 'Romanian Deadlifts (RDLs)', sets: 4, repsRange: '8-10', rest: '120 sec', note: 'Hinge at hips, feel hamstring stretch' },
      { id: 'leg_press', name: 'Leg Press', sets: 3, repsRange: '10-12', rest: '90 sec', note: 'Mid-platform, shoulder-width' },
      { id: 'walking_lunges', name: 'Walking Lunges (DB or BW)', sets: 3, repsRange: '10 each leg', rest: '90 sec', note: '20 total steps per set' },
      { id: 'leg_curls', name: 'Leg Curls (Lying or Seated)', sets: 3, repsRange: '12-15', rest: '60 sec', note: 'Controlled, squeeze at top' },
      { id: 'calf_raises', name: 'Calf Raises (Standing or Seated)', sets: 3, repsRange: '15-20', rest: '60 sec', note: 'Full ROM, stretch at bottom' },
    ],
  },
  saturday: {
    name: 'Upper',
    day: 'Saturday',
    subtitle: 'Chest / Back / Arms (Pump)',
    warmup: [
      'Arm circles: 20 each direction',
      'Band pull-aparts: 15 reps',
      'Push-ups: 10 reps',
      'Scapular pull-ups: 10 reps',
    ],
    exercises: [
      { id: 'db_bench_s', name: 'Dumbbell Bench Press', sets: 3, repsRange: '10-12', rest: '90 sec', note: '60% of Monday weight' },
      { id: 'cable_rows_s', name: 'Seated Cable Rows', sets: 3, repsRange: '12-15', rest: '90 sec', note: 'Squeeze and hold' },
      { id: 'db_shoulder', name: 'DB Shoulder Press', sets: 3, repsRange: '10-12', rest: '90 sec', note: 'Controlled tempo' },
      { id: 'lat_pulldown_s', name: 'Lat Pulldowns (Wide Grip)', sets: 3, repsRange: '12-15', rest: '90 sec', note: 'Wide overhand grip' },
      { id: 'db_curls_s', name: 'DB Bicep Curls (Alternating)', sets: 3, repsRange: '12-15 each', rest: '60 sec', note: 'Full ROM each arm' },
      { id: 'oh_tri_ext', name: 'Overhead DB Tricep Extension', sets: 3, repsRange: '12-15', rest: '60 sec', note: 'Deep stretch at bottom' },
    ],
  },
};

// ============================================================
// DAILY SCHEDULES (v3 from Apr 29)
// Training: meal1=banana pre-workout, meal2=chicken, meal3=whey+PB, meal4=chicken, meal5=whey+PB, meal6=psyllium
// Rest: meal1=chicken, meal2=whey+PB, meal3=chicken, meal4=whey+PB, meal5=psyllium
// ============================================================

// --- TRAINING DAY BLOCKS ---

const WORKOUT_MORNING = [
  { id: 'wake', time: '5:50 AM', task: 'Wake up, chug 500ml water', cat: 'routine' },
  { id: 'preworkout', time: '6:00 AM', task: 'PRE-WORKOUT (12 oz water): caffeine 200mg + citrulline 6g + betaine 2.5g', cat: 'supplement' },
  { id: 'dress', time: '6:05 AM', task: 'Get dressed (clothes laid out)', cat: 'routine' },
  { id: 'leave', time: '6:15 AM', task: 'Drive to gym', cat: 'routine' },
  { id: 'arrive', time: '6:30 AM', task: 'Arrive, warm-up: 5 min cardio + stretches', cat: 'gym' },
  { id: 'meal1', time: '6:30 AM', task: 'MEAL 1 (pre-workout): 1 banana 118g', cat: 'meal', mealId: 'meal1', calories: 105, protein: 1, carbs: 25, fat: 0 },
];

const WORKOUT_POST = [
  { id: 'workout_done', time: '7:20 AM', task: 'Workout complete', cat: 'gym' },
  { id: 'cardio_post', time: '7:25 AM', task: 'Post-workout: 10 min incline walk (3.5 mph, 10%)', cat: 'exercise', isCardio: true },
  { id: 'go_home', time: '7:35 AM', task: 'Head home', cat: 'routine' },
  { id: 'shower', time: '8:00 AM', task: 'Shower', cat: 'routine' },
  { id: 'start_day', time: '8:30 AM', task: 'Start day (ViralPilot, O-1A, classes)', cat: 'routine' },
];

const TRAINING_MID = [
  { id: 'meal2', time: '12:30 PM', task: 'MEAL 2 (Lunch): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal2', calories: 559, protein: 86, carbs: 18, fat: 13 },
  { id: 'walk_lunch', time: '2:00 PM', task: 'Short walk (track steps)', cat: 'routine' },
  { id: 'meal3', time: '3:00 PM', task: 'MEAL 3 (Snack): 45g whey + 10g PB', cat: 'meal', mealId: 'meal3', calories: 240, protein: 42, carbs: 4, fat: 5 },
  { id: 'meal4', time: '6:30 PM', task: 'MEAL 4 (Dinner): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal4', calories: 559, protein: 86, carbs: 18, fat: 13 },
  { id: 'evening', time: '7:00 PM', task: 'Evening activities / walk for steps', cat: 'routine' },
  { id: 'meal5', time: '8:00 PM', task: 'MEAL 5 (Evening): 45g whey + 10g PB', cat: 'meal', mealId: 'meal5', calories: 240, protein: 42, carbs: 4, fat: 5 },
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 15,000+? If not, walk', cat: 'goal' },
  { id: 'meal6', time: '10:00 PM', task: 'MEAL 6 (Bedtime): psyllium 20g in 16 oz water', cat: 'meal', mealId: 'meal6', calories: 70, protein: 0, carbs: 0, fat: 0 },
  { id: 'pills_pm', time: '10:00 PM', task: 'BEDTIME STACK: psyllium 20g + Zinc 25mg + Mag 500mg + Ash 600mg (16 oz water)', cat: 'supplement' },
  { id: 'wind_down', time: '10:30 PM', task: 'Brush teeth, lay out gym clothes, phone away', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED \u2014 7 hours sleep', cat: 'sleep' },
];

// --- REST DAY BLOCKS ---

const REST_MORN = [
  { id: 'wake_rest', time: '5:50 AM', task: 'Wake up, chug 500ml water', cat: 'routine' },
  { id: 'shower', time: '8:00 AM', task: 'Shower, start day', cat: 'routine' },
];

const REST_MID = [
  { id: 'meal1', time: '12:30 PM', task: 'MEAL 1 (Lunch): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal1', calories: 559, protein: 86, carbs: 18, fat: 13 },
  { id: 'continue', time: '1:00 PM', task: 'Work / classes / study', cat: 'routine' },
  { id: 'meal2', time: '3:00 PM', task: 'MEAL 2 (Snack): 45g whey + 10g PB', cat: 'meal', mealId: 'meal2', calories: 240, protein: 42, carbs: 4, fat: 5 },
  { id: 'meal3', time: '6:30 PM', task: 'MEAL 3 (Dinner): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal3', calories: 559, protein: 86, carbs: 18, fat: 13 },
  { id: 'walk_eve', time: '7:15 PM', task: 'Evening walk (40 min, ~4,000 steps)', cat: 'exercise' },
  { id: 'meal4', time: '8:00 PM', task: 'MEAL 4 (Evening): 45g whey + 10g PB', cat: 'meal', mealId: 'meal4', calories: 240, protein: 42, carbs: 4, fat: 5 },
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 15,000+?', cat: 'goal' },
  { id: 'meal5', time: '10:00 PM', task: 'MEAL 5 (Bedtime): psyllium 20g in 16 oz water', cat: 'meal', mealId: 'meal5', calories: 70, protein: 0, carbs: 0, fat: 0 },
  { id: 'pills_pm', time: '10:00 PM', task: 'BEDTIME STACK: psyllium 20g + Zinc 25mg + Mag 500mg + Ash 600mg (16 oz water)', cat: 'supplement' },
  { id: 'wind_down', time: '10:30 PM', task: 'Brush teeth, phone away', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED \u2014 7+ hours sleep', cat: 'sleep' },
];

// --- EXERCISE BLOCKS (per workout day) ---

const MON_EX = [
  { id: 'ex_bench', time: '6:35 AM', task: 'DB Bench Press: 4\u00D76-8 (120s rest)', cat: 'exercise' },
  { id: 'ex_inc', time: '6:48 AM', task: 'Incline DB Press: 3\u00D78-10 (90s rest)', cat: 'exercise' },
  { id: 'ex_ohp', time: '6:56 AM', task: 'Overhead Press: 3\u00D76-8 (120s rest)', cat: 'exercise' },
  { id: 'ex_lr', time: '7:04 AM', task: 'Lateral Raises: 3\u00D712-15 (60s rest)', cat: 'exercise' },
  { id: 'ex_dips', time: '7:09 AM', task: 'Assisted Dips: 3\u00D78-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_tri', time: '7:15 AM', task: 'Cable Tri Pushdowns: 3\u00D712-15 (60s rest)', cat: 'exercise' },
];

const TUE_EX = [
  { id: 'ex_pull', time: '6:35 AM', task: 'Assisted Pull-ups: 4\u00D76-10 (120s rest)', cat: 'exercise' },
  { id: 'ex_rows', time: '6:48 AM', task: 'Barbell Rows: 4\u00D76-8 (120s rest)', cat: 'exercise' },
  { id: 'ex_cable', time: '6:58 AM', task: 'Seated Cable Rows: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_face', time: '7:05 AM', task: 'Face Pulls: 3\u00D715-20 (60s rest)', cat: 'exercise' },
  { id: 'ex_curl', time: '7:10 AM', task: 'Barbell Curls: 3\u00D78-10 (90s rest)', cat: 'exercise' },
  { id: 'ex_hammer', time: '7:16 AM', task: 'Hammer Curls: 3\u00D710-12 (60s rest)', cat: 'exercise' },
];

const THU_EX = [
  { id: 'ex_squat', time: '6:35 AM', task: 'Back Squats: 4\u00D76-8 (150s rest)', cat: 'exercise' },
  { id: 'ex_rdl', time: '6:50 AM', task: 'Romanian Deadlifts: 4\u00D78-10 (120s rest)', cat: 'exercise' },
  { id: 'ex_lp', time: '7:02 AM', task: 'Leg Press: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_lunge', time: '7:10 AM', task: 'Walking Lunges: 3\u00D710 each (90s rest)', cat: 'exercise' },
  { id: 'ex_lc', time: '7:18 AM', task: 'Leg Curls: 3\u00D712-15 (60s rest)', cat: 'exercise' },
  { id: 'ex_calf', time: '7:23 AM', task: 'Calf Raises: 3\u00D715-20 (60s rest)', cat: 'exercise' },
];

const SAT_EX = [
  { id: 'ex_bench_s', time: '6:35 AM', task: 'DB Bench Press: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_cable_s', time: '6:43 AM', task: 'Seated Cable Rows: 3\u00D712-15 (90s rest)', cat: 'exercise' },
  { id: 'ex_dbs', time: '6:51 AM', task: 'DB Shoulder Press: 3\u00D710-12 (90s rest)', cat: 'exercise' },
  { id: 'ex_lat_s', time: '6:59 AM', task: 'Lat Pulldowns (Wide): 3\u00D712-15 (90s rest)', cat: 'exercise' },
  { id: 'ex_curl_s', time: '7:07 AM', task: 'DB Curls (Alt): 3\u00D712-15 each (60s rest)', cat: 'exercise' },
  { id: 'ex_oh_tri', time: '7:13 AM', task: 'OH DB Tri Extension: 3\u00D712-15 (60s rest)', cat: 'exercise' },
];

// ============================================================
// APR 30 ONLY - ONE-TIME VEGETARIAN MONDAY
// (from May 7 Mon goes back to regular chicken)
// ============================================================

export const MONDAY_VEG_SCHEDULE = [
  { id: 'weigh_in', time: '5:50 AM', task: 'WEIGH YOURSELF (after bathroom, naked, empty stomach \u2014 log it)', cat: 'goal' },
  { id: 'wake', time: '5:50 AM', task: 'Wake up, chug 500ml water', cat: 'routine' },
  { id: 'preworkout', time: '6:00 AM', task: 'PRE-WORKOUT: caffeine 200mg + citrulline 6g + betaine 2.5g', cat: 'supplement' },
  { id: 'dress', time: '6:05 AM', task: 'Get dressed (clothes laid out)', cat: 'routine' },
  { id: 'leave', time: '6:15 AM', task: 'Drive to gym', cat: 'routine' },
  { id: 'arrive', time: '6:30 AM', task: 'Arrive, warm-up: 5 min cardio + arm circles + band pulls', cat: 'gym' },
  ...MON_EX,
  { id: 'workout_done', time: '7:20 AM', task: 'Workout complete', cat: 'gym' },
  { id: 'cardio_post', time: '7:25 AM', task: 'Post-workout: 10 min incline walk (3.5 mph, 10%)', cat: 'exercise', isCardio: true },
  { id: 'go_home', time: '7:35 AM', task: 'Head home', cat: 'routine' },
  { id: 'meal1', time: '7:35 AM', task: 'MEAL 1: 90g whey + creatine 5g (VEGETARIAN DAY)', cat: 'meal', mealId: 'meal1', calories: 360, protein: 81, carbs: 0, fat: 0 },
  { id: 'shower', time: '8:00 AM', task: 'Shower', cat: 'routine' },
  { id: 'start_day', time: '8:30 AM', task: 'Start day', cat: 'routine' },
  { id: 'meal2', time: '12:30 PM', task: 'MEAL 2: Greek yogurt 600g + 1 banana (VEGETARIAN DAY)', cat: 'meal', mealId: 'meal2', calories: 459, protein: 61, carbs: 73, fat: 0 },
  { id: 'walk_lunch', time: '2:00 PM', task: 'Short walk (track steps)', cat: 'routine' },
  { id: 'meal3', time: '3:00 PM', task: 'MEAL 3: PB 20g', cat: 'meal', mealId: 'meal3', calories: 120, protein: 4, carbs: 3, fat: 10 },
  { id: 'meal4', time: '6:30 PM', task: 'MEAL 4: 90g whey + Greek yogurt 400g (VEGETARIAN DAY)', cat: 'meal', mealId: 'meal4', calories: 596, protein: 121, carbs: 32, fat: 0 },
  { id: 'evening', time: '7:00 PM', task: 'Evening activities / walk for steps', cat: 'routine' },
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 15,000+? If not, walk', cat: 'goal' },
  { id: 'meal5', time: '10:00 PM', task: 'MEAL 5 (Bedtime): psyllium 20g in 16 oz water', cat: 'meal', mealId: 'meal5', calories: 70, protein: 0, carbs: 0, fat: 0 },
  { id: 'pills_pm', time: '10:00 PM', task: 'BEDTIME STACK: psyllium 20g + Zinc 25mg + Mag 500mg + Ash 600mg (16 oz water)', cat: 'supplement' },
  { id: 'wind_down', time: '10:30 PM', task: 'Brush teeth, lay out gym clothes, phone away', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED \u2014 7 hours sleep', cat: 'sleep' },
];

// ============================================================
// DAILY SCHEDULES (base templates)
// ============================================================

const addWeighIn = (arr, time) => [
  { id: 'weigh_in', time, task: 'WEIGH YOURSELF (after bathroom, naked, empty stomach \u2014 log it)', cat: 'goal' },
  ...arr,
];

export const DAILY_SCHEDULES = {
  monday: addWeighIn(
    [...WORKOUT_MORNING, ...MON_EX, ...WORKOUT_POST, ...TRAINING_MID],
    '5:50 AM'
  ),
  tuesday: [...WORKOUT_MORNING, ...TUE_EX, ...WORKOUT_POST, ...TRAINING_MID],
  wednesday: addWeighIn(
    [...REST_MORN, ...REST_MID],
    '5:50 AM'
  ),
  thursday: [
    ...WORKOUT_MORNING.map(t =>
      t.id === 'arrive' ? { ...t, task: 'Arrive, warm-up: 5 min cardio + leg swings + glute bridges' } : t
    ),
    ...THU_EX, ...WORKOUT_POST, ...TRAINING_MID,
  ],
  friday: addWeighIn(
    [...REST_MORN, ...REST_MID],
    '5:50 AM'
  ),
  saturday: [
    ...WORKOUT_MORNING.map(t =>
      t.id === 'arrive' ? { ...t, task: 'Arrive, warm-up: 5 min cardio + arm circles + band pulls' } : t
    ),
    ...SAT_EX, ...WORKOUT_POST, ...TRAINING_MID,
  ],
  sunday: [
    { id: 'wake', time: '9:30 AM', task: 'Wake up (no alarm, sleep in)', cat: 'routine' },
    { id: 'water', time: '9:30 AM', task: 'Chug 500ml water', cat: 'routine' },
    { id: 'shower', time: '10:30 AM', task: 'Shower, relax', cat: 'routine' },
    { id: 'grocery', time: '11:00 AM', task: 'WALMART: 10 lbs chicken breast + yogurt + PB + curry ingredients', cat: 'prep' },
    { id: 'mp_start', time: '11:30 AM', task: 'MEAL PREP \u2014 Telugu Chicken Sukha Curry (10 lbs)', cat: 'prep' },
    { id: 'mp_cut', time: '11:30 AM', task: 'Cut 10 lbs chicken into 1.5-2" cubes', cat: 'prep' },
    { id: 'mp_marinate', time: '11:45 AM', task: 'Marinate: chicken + ginger-garlic paste + chili + turmeric + salt + lemon juice', cat: 'prep' },
    { id: 'mp_prep_veg', time: '11:45 AM', task: 'Slice 4 onions, chop 3 tomatoes, slit 8 green chilies', cat: 'prep' },
    { id: 'mp_cook_start', time: '12:00 PM', task: 'Heat pressure cooker + 5 tbsp oil, add curry leaves', cat: 'prep' },
    { id: 'mp_onions', time: '12:00 PM', task: 'Cook onions until golden brown (12-15 min)', cat: 'prep' },
    { id: 'mp_masala', time: '12:15 PM', task: 'Add ginger-garlic, chilies, tomatoes, all spices \u2014 cook until oil separates', cat: 'prep' },
    { id: 'mp_pressure', time: '12:25 PM', task: 'Add chicken + 1 cup water \u2014 pressure cook 2 whistles (15 min)', cat: 'prep' },
    { id: 'mp_release', time: '12:40 PM', task: 'Natural release 5 min, open, stir on high 5 min to evaporate', cat: 'prep' },
    { id: 'mp_finish', time: '12:45 PM', task: 'Add garam masala + cilantro + lemon juice, turn off heat', cat: 'prep' },
    { id: 'mp_portion', time: '1:00 PM', task: 'Portion: 262g curry per container (14 total) \u2014 food scale required', cat: 'prep' },
    { id: 'mp_label', time: '1:15 PM', task: 'Label: MON-L, MON-D, TUE-L, TUE-D ... SUN-L, SUN-D', cat: 'prep' },
    { id: 'mp_store', time: '1:30 PM', task: 'Store all containers in fridge, clean kitchen', cat: 'prep' },
    { id: 'meal1', time: '1:00 PM', task: 'MEAL 1 (Lunch): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal1', calories: 559, protein: 86, carbs: 18, fat: 13 },
    { id: 'meal2', time: '3:00 PM', task: 'MEAL 2 (Snack): 45g whey + 10g PB', cat: 'meal', mealId: 'meal2', calories: 240, protein: 42, carbs: 4, fat: 5 },
    { id: 'meal3', time: '6:30 PM', task: 'MEAL 3 (Dinner): 262g chicken curry + 100g yogurt', cat: 'meal', mealId: 'meal3', calories: 559, protein: 86, carbs: 18, fat: 13 },
    { id: 'walk_eve', time: '7:15 PM', task: 'Evening walk (40 min)', cat: 'exercise' },
    { id: 'review', time: '8:00 PM', task: 'WEEKLY CHECK-IN: weight avg, energy, hunger, adherence, sleep', cat: 'routine' },
    { id: 'meal4', time: '8:00 PM', task: 'MEAL 4 (Evening): 45g whey + 10g PB', cat: 'meal', mealId: 'meal4', calories: 240, protein: 42, carbs: 4, fat: 5 },
    { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 12,000+ (Sunday min)', cat: 'goal' },
    { id: 'prep_mon', time: '9:00 PM', task: 'Prep Monday: gym clothes, water bottle, shaker, banana out', cat: 'routine' },
    { id: 'meal5', time: '10:00 PM', task: 'MEAL 5 (Bedtime): psyllium 20g in 16 oz water', cat: 'meal', mealId: 'meal5', calories: 70, protein: 0, carbs: 0, fat: 0 },
    { id: 'pills_pm', time: '10:00 PM', task: 'BEDTIME STACK: psyllium 20g + Zinc 25mg + Mag 500mg + Ash 600mg (16 oz water)', cat: 'supplement' },
    { id: 'wind_down', time: '10:30 PM', task: 'Lay out gym clothes, set 5:50 AM alarm, phone away', cat: 'routine' },
    { id: 'bed', time: '11:00 PM', task: 'BED \u2014 early for Monday workout', cat: 'sleep' },
  ],
};

// ============================================================
// MAY 17 - GIRLFRIEND'S BIRTHDAY (strategic refeed)
// ============================================================

export const GF_BIRTHDAY_SCHEDULE = [
  { id: 'wake', time: '5:50 AM', task: 'Wake up, chug 500ml water', cat: 'routine' },
  { id: 'preworkout', time: '6:00 AM', task: 'Coffee/caffeine 200mg (0 cal)', cat: 'supplement' },
  { id: 'meal1', time: '10:00 AM', task: 'MEAL 1: 120g whey (480 cal, 108g protein)', cat: 'meal', mealId: 'meal1', calories: 480, protein: 108, carbs: 0, fat: 0 },
  { id: 'walk_am', time: '11:00 AM', task: 'Walk / errands / prep for evening', cat: 'routine' },
  { id: 'meal2', time: '2:00 PM', task: 'MEAL 2: 200g Greek yogurt (118 cal, 20g protein)', cat: 'meal', mealId: 'meal2', calories: 118, protein: 20, carbs: 8, fat: 0 },
  { id: 'get_ready', time: '4:30 PM', task: 'Get ready for dinner', cat: 'routine' },
  { id: 'dinner_start', time: '6:00 PM', task: 'DINNER: Indian restaurant with girlfriend', cat: 'meal', mealId: 'meal3', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { id: 'dinner_tikka', time: '6:15 PM', task: 'ORDER: Chicken tikka (6 pcs) \u2014 300 cal, 40g protein', cat: 'meal', mealId: 'meal3_tikka', calories: 300, protein: 40, carbs: 5, fat: 12 },
  { id: 'dinner_biryani', time: '6:30 PM', task: 'ORDER: HALF mutton biryani (eat mutton, less rice) \u2014 450 cal, 22g protein', cat: 'meal', mealId: 'meal3_biryani', calories: 450, protein: 22, carbs: 45, fat: 18 },
  { id: 'dinner_naan', time: '6:30 PM', task: 'SKIP naan or half only (0-150 cal)', cat: 'routine' },
  { id: 'dinner_cake', time: '7:30 PM', task: 'Cake: 1 slice when she feeds you \u2014 450 cal, 5g protein', cat: 'meal', mealId: 'meal3_cake', calories: 450, protein: 5, carbs: 55, fat: 22 },
  { id: 'steps_check', time: '9:00 PM', task: 'Check steps \u2014 12,000+', cat: 'goal' },
  { id: 'pills_pm', time: '10:00 PM', task: 'BEDTIME STACK: psyllium 20g + Zinc 25mg + Mag 500mg + Ash 600mg (16 oz water)', cat: 'supplement' },
  { id: 'remind', time: '10:00 PM', task: 'REMINDER: Scale will show +2-3 lbs tomorrow (water weight, gone by May 21)', cat: 'routine' },
  { id: 'bed', time: '11:00 PM', task: 'BED \u2014 back to normal tomorrow', cat: 'sleep' },
];

// ============================================================
// PROGRESS PHOTOS (every 2 weeks)
// ============================================================

export const PROGRESS_PHOTO_DATES = [
  '2026-03-30', // baseline
  '2026-04-13', // Week 2
  '2026-04-27', // Week 4
  '2026-05-11', // Week 6
  '2026-05-15', // Graduation
  '2026-05-25', // Week 8
  '2026-06-08', // Week 10
  '2026-06-22', // Week 12
  '2026-07-06', // Week 14
  '2026-07-20', // Week 16 FINAL
];

export const MILESTONE_MESSAGES = {
  7:   "Week 1 down. Water drop phase, adaptation fatigue is normal.",
  14:  "Two weeks! Energy improving, getting used to volume.",
  21:  "Three weeks \u2014 face leaner, upper abs faint when flexed.",
  28:  "Four weeks! Love handles 35% smaller, people notice.",
  35:  "5 weeks \u2014 GRADUATION week. Upper abs visible flexed.",
  42:  "Week 6 \u2014 DELOAD. Recover hard, come back stronger.",
  49:  "7 weeks. Critical week \u2014 most people quit here. Push through.",
  56:  "8 weeks \u2014 halfway. Upper 4-pack clear, strength may drop 10%.",
  63:  "9 weeks. Abs visible without flexing (top 4), face very lean.",
  70:  "10 weeks. Love handles 85% gone, vascular.",
  77:  "11 weeks. Upper 4-pack clear, defined.",
  84:  "12 weeks. Lower abs emerging, obliques showing.",
  91:  "13 weeks. Love handles 90% gone, very lean.",
  98:  "14 weeks. 5 abs clearly visible.",
  105: "15 weeks \u2014 full 6-pack emerging, shredded look.",
  112: "16 WEEKS \u2014 SHREDDED. Full 6-pack visible. You did it.",
};

export const ACHIEVEMENT_BADGES = [
  { id: 'week1',       name: 'Week 1 Complete',    desc: 'Survived the hardest week',        icon: '\u2B50' },
  { id: 'ten_lbs',     name: '10 lbs Lost',        desc: 'Double digits down',                icon: '\uD83D\uDD25' },
  { id: 'twenty_lbs',  name: '20 lbs Lost',        desc: 'Incredible progress',               icon: '\uD83C\uDFC6' },
  { id: 'thirty_lbs',  name: '30 lbs Lost',        desc: 'Transformation territory',          icon: '\uD83D\uDCA5' },
  { id: 'fifty_lbs',   name: '50 lbs Lost',        desc: 'Goal weight hit',                   icon: '\uD83D\uDC8E' },
  { id: 'streak7',     name: '7-Day Streak',       desc: 'A full week of discipline',         icon: '\uD83D\uDCAA' },
  { id: 'streak14',    name: '14-Day Streak',      desc: 'Two weeks strong',                  icon: '\u26A1' },
  { id: 'streak30',    name: '30-Day Streak',      desc: 'Unstoppable',                       icon: '\uD83D\uDE80' },
  { id: 'streak60',    name: '60-Day Streak',      desc: 'Two months of fire',                icon: '\uD83C\uDF1F' },
  { id: 'streak100',   name: '100-Day Streak',     desc: 'Legendary',                         icon: '\uD83D\uDC51' },
  { id: 'all_w1',      name: 'All Workouts W1',    desc: 'Hit every workout Week 1',          icon: '\uD83C\uDFCB' },
  { id: 'beat_lifts',  name: 'Beat All Lifts',     desc: 'Beat every lift from last week',    icon: '\uD83D\uDCC8' },
  { id: 'graduation',  name: 'Graduation Day',     desc: 'Week 5 checkpoint',                 icon: '\uD83C\uDF93' },
  { id: 'deload',      name: 'Deload Complete',    desc: 'Recovered and ready to push',       icon: '\uD83D\uDD04' },
  { id: 'shredded',    name: 'Actually Shredded',  desc: '16 weeks. 172 lbs. Done.',          icon: '\uD83D\uDC8E' },
];

export const SUPPLEMENT_CHECKLIST = {
  training_am: [
    { id: 'caffeine', name: 'Caffeine 200mg' },
    { id: 'citrulline', name: 'L-Citrulline 6g' },
    { id: 'betaine', name: 'Betaine 2.5g' },
    { id: 'creatine', name: 'Creatine 5g (in shake)' },
  ],
  rest_am: [
    { id: 'creatine', name: 'Creatine 5g' },
    { id: 'multi', name: 'Multivitamin' },
    { id: 'vitd', name: 'Vitamin D3 5000 IU' },
    { id: 'fishoil', name: 'Fish Oil 3g (3 caps)' },
  ],
  bedtime: [
    { id: 'psyllium', name: 'Psyllium 20g (in 16 oz water)' },
    { id: 'zinc', name: 'Zinc 25mg' },
    { id: 'magnesium', name: 'Magnesium 500mg' },
    { id: 'ashwagandha', name: 'Ashwagandha 600mg' },
  ],
};

// Weekly weight targets
export const WEEKLY_TARGETS = [
  { week: 1,  target: 218, note: 'Water drop, adaptation phase, fatigue normal' },
  { week: 2,  target: 215, note: 'Energy improving, getting used to volume' },
  { week: 3,  target: 212, note: 'Face leaner, upper abs faint when flexed' },
  { week: 4,  target: 209.5, note: 'v2 plan: 262g chicken + yogurt' },
  { week: 5,  target: 206, note: 'v3 plan: banana pre-workout + whey/PB snacks' },
  { week: 6,  target: 202, note: 'DELOAD WEEK - reduce volume/weight 30%' },
  { week: 7,  target: 199, note: 'GRADUATION May 15 - upper abs visible flexed' },
  { week: 8,  target: 195.5, note: 'Upper 4-pack clear, strength may drop 10%' },
  { week: 9,  target: 192, note: 'Abs visible without flexing (top 4)' },
  { week: 10, target: 189, note: 'Love handles 85% gone' },
  { week: 11, target: 185.5, note: 'Upper 4-pack clear, defined' },
  { week: 12, target: 181.5, note: 'Lower abs emerging, obliques showing' },
  { week: 13, target: 178, note: 'Love handles 90% gone, very lean' },
  { week: 14, target: 175, note: '5 abs clearly visible' },
  { week: 15, target: 172, note: 'SHREDDED - full 6-pack, love handles gone' },
  { week: 16, target: 172, note: 'Final week - maintenance at goal' },
];
