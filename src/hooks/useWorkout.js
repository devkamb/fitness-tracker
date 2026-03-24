import { useState, useEffect, useCallback } from 'react';
import { getData, setData } from '../utils/storage';
import { getWorkoutForDay } from '../utils/helpers';

function createEmptyWorkout(dateStr, workout) {
  const exercises = {};
  workout.exercises.forEach((ex) => {
    exercises[ex.id] = {
      sets: Array.from({ length: ex.sets }, () => ({
        weight: '',
        reps: '',
        done: false,
      })),
    };
  });
  return { id: dateStr, workout: workout.name, exercises };
}

export function useWorkout(dateStr) {
  const [workoutData, setWorkoutData] = useState(null);
  const [lastWeekData, setLastWeekData] = useState(null);
  const [loading, setLoading] = useState(true);
  const workout = getWorkoutForDay(dateStr);

  useEffect(() => {
    if (!dateStr || !workout) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    Promise.all([
      getData('workouts', dateStr),
      // Get last week's data (7 days ago)
      getData('workouts', getDateNDaysAgo(dateStr, 7)),
    ]).then(([current, lastWeek]) => {
      if (cancelled) return;
      setWorkoutData(current || createEmptyWorkout(dateStr, workout));
      setLastWeekData(lastWeek);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [dateStr, workout]);

  const updateSet = useCallback((exerciseId, setIndex, field, value) => {
    setWorkoutData((prev) => {
      const next = { ...prev };
      next.exercises = { ...next.exercises };
      next.exercises[exerciseId] = { ...next.exercises[exerciseId] };
      next.exercises[exerciseId].sets = [...next.exercises[exerciseId].sets];
      next.exercises[exerciseId].sets[setIndex] = {
        ...next.exercises[exerciseId].sets[setIndex],
        [field]: value,
      };
      setData('workouts', next);
      return next;
    });
  }, []);

  const toggleSet = useCallback((exerciseId, setIndex) => {
    setWorkoutData((prev) => {
      const next = { ...prev };
      next.exercises = { ...next.exercises };
      next.exercises[exerciseId] = { ...next.exercises[exerciseId] };
      next.exercises[exerciseId].sets = [...next.exercises[exerciseId].sets];
      const currentSet = next.exercises[exerciseId].sets[setIndex];
      next.exercises[exerciseId].sets[setIndex] = {
        ...currentSet,
        done: !currentSet.done,
      };
      setData('workouts', next);
      return next;
    });
  }, []);

  const isComplete = workoutData && workout
    ? workout.exercises.every((ex) =>
        workoutData.exercises[ex.id]?.sets.every((s) => s.done)
      )
    : false;

  return { workout, workoutData, lastWeekData, loading, updateSet, toggleSet, isComplete };
}

function getDateNDaysAgo(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}
