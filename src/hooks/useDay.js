import { useState, useEffect, useCallback } from 'react';
import { getData, setData } from '../utils/storage';
import { getDayData, getScheduleForDay, isSaturday, calcMacrosFromChecked } from '../utils/helpers';

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
      // Derive allComplete: all meals, supplements, steps, bedtime
      const meals = Object.values(next.meals);
      const allMeals = meals.every(Boolean);
      const supps = Object.values(next.supplements);
      const allSupps = supps.every(Boolean);
      const allComplete = allMeals && allSupps && next.steps && next.bedtime;
      const final = { ...next, allComplete };
      setData('days', final);
      return final;
    });
  }, []);

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
    // Add manual Saturday entry
    let manual = 0;
    if (isSaturday(dateStr) && day.meal3Manual.calories && day.checked.meal3_date) {
      manual = Number(day.meal3Manual.calories) || 0;
    }
    const sat = isSaturday(dateStr);
    return { consumed: calories + manual, target: sat ? 3000 : 2028 };
  }, [day, dateStr]);

  const getProtein = useCallback(() => {
    if (!day) return { consumed: 0, target: 227 };
    const schedule = getScheduleForDay(dateStr);
    const { protein } = calcMacrosFromChecked(schedule, day.checked);
    let manual = 0;
    if (isSaturday(dateStr) && day.meal3Manual.protein && day.checked.meal3_date) {
      manual = Number(day.meal3Manual.protein) || 0;
    }
    return { consumed: protein + manual, target: 227 };
  }, [day, dateStr]);

  return {
    day, loading,
    toggleTask, toggleTaskWithSync,
    toggleSteps, toggleBedtime,
    setMeal3Manual,
    getCalories, getProtein,
    updateDay,
  };
}
