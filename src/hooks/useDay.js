import { useState, useEffect, useCallback } from 'react';
import { getData, setDataWithBackup as setData } from '../utils/storage';
import { getDayData, getScheduleForDay, calcMacrosFromChecked, getDayTargets } from '../utils/helpers';

export function useDay(dateStr) {
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateStr) return;
    let cancelled = false;
    setLoading(true);
    getData('days', dateStr).then((data) => {
      if (cancelled) return;
      setDay(data || getDayData(dateStr));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [dateStr]);

  const updateDay = useCallback(async (updater) => {
    setDay((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      // Derive allComplete from the schedule's actual meals being checked
      const schedule = getScheduleForDay(dateStr);
      const mealTasks = schedule.filter(t => t.cat === 'meal');
      const allMeals = mealTasks.length > 0 && mealTasks.every(t => next.checked[t.id]);
      const allComplete = allMeals && next.steps && next.bedtime;
      const final = { ...next, allComplete };
      setData('days', final);
      return final;
    });
  }, [dateStr]);

  const toggleTask = useCallback((taskId) => {
    updateDay((prev) => ({
      ...prev,
      checked: { ...prev.checked, [taskId]: !prev.checked[taskId] },
    }));
  }, [updateDay]);

  // Also keep the meal/supplement tracking in sync for backward compat + weekly stats
  const toggleTaskWithSync = useCallback((task) => {
    updateDay((prev) => {
      const newChecked = { ...prev.checked, [task.id]: !prev.checked[task.id] };
      const updates = { checked: newChecked };
      // Sync meals
      if (task.mealId) {
        updates.meals = { ...prev.meals, [task.mealId]: !prev.checked[task.id] };
      }
      // Sync supplements
      if (task.cat === 'supplement') {
        updates.supplements = {
          ...prev.supplements,
          multivitamin: !prev.checked[task.id],
          calcium: !prev.checked[task.id],
        };
      }
      return { ...prev, ...updates };
    });
  }, [updateDay]);

  const toggleSteps = useCallback(() => {
    updateDay((prev) => ({ ...prev, steps: !prev.steps }));
  }, [updateDay]);

  const setStepCount = useCallback((count) => {
    const targets = getDayTargets(dateStr);
    const stepGoal = targets.steps || 15000;
    updateDay((prev) => ({
      ...prev,
      stepCount: count,
      steps: Number(count) >= stepGoal,
    }));
  }, [updateDay, dateStr]);

  const toggleBedtime = useCallback(() => {
    updateDay((prev) => ({ ...prev, bedtime: !prev.bedtime }));
  }, [updateDay]);

  const setMeal3Manual = useCallback((field, value) => {
    updateDay((prev) => ({
      ...prev,
      meal3Manual: { ...prev.meal3Manual, [field]: value },
    }));
  }, [updateDay]);

  const getCalories = useCallback(() => {
    if (!day) return { consumed: 0, target: 0 };
    const schedule = getScheduleForDay(dateStr);
    const { calories } = calcMacrosFromChecked(schedule, day.checked);
    const targets = getDayTargets(dateStr);
    return { consumed: calories, target: targets.calories };
  }, [day, dateStr]);

  const getProtein = useCallback(() => {
    if (!day) return { consumed: 0, target: 0 };
    const schedule = getScheduleForDay(dateStr);
    const { protein } = calcMacrosFromChecked(schedule, day.checked);
    const targets = getDayTargets(dateStr);
    return { consumed: protein, target: targets.protein };
  }, [day, dateStr]);

  const getCarbs = useCallback(() => {
    if (!day) return { consumed: 0, target: 0 };
    const schedule = getScheduleForDay(dateStr);
    const { carbs } = calcMacrosFromChecked(schedule, day.checked);
    const targets = getDayTargets(dateStr);
    return { consumed: carbs, target: targets.carbs };
  }, [day, dateStr]);

  return {
    day, loading,
    toggleTask, toggleTaskWithSync,
    toggleSteps, setStepCount, toggleBedtime,
    setMeal3Manual,
    getCalories, getProtein, getCarbs,
    updateDay,
  };
}
