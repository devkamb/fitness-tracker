import { useState, useEffect, useCallback } from 'react';
import { getData, setData } from '../utils/storage';
import { getDayData, getMealsForDay, isSaturday } from '../utils/helpers';

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
      // Calculate allComplete
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

  const toggleMeal = useCallback((mealId) => {
    updateDay((prev) => ({
      ...prev,
      meals: { ...prev.meals, [mealId]: !prev.meals[mealId] },
    }));
  }, [updateDay]);

  const toggleSupplement = useCallback((suppId) => {
    updateDay((prev) => ({
      ...prev,
      supplements: { ...prev.supplements, [suppId]: !prev.supplements[suppId] },
    }));
  }, [updateDay]);

  const toggleRoutine = useCallback((routineId) => {
    updateDay((prev) => ({
      ...prev,
      morningRoutine: { ...prev.morningRoutine, [routineId]: !prev.morningRoutine[routineId] },
    }));
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
    const meals = getMealsForDay(dateStr);
    let consumed = 0;
    meals.forEach((meal) => {
      if (day.meals[meal.id]) {
        if (meal.calories !== null) {
          consumed += meal.calories;
        } else if (day.meal3Manual.calories) {
          consumed += Number(day.meal3Manual.calories) || 0;
        }
      }
    });
    const sat = isSaturday(dateStr);
    const target = sat ? 3000 : 2028;
    return { consumed, target };
  }, [day, dateStr]);

  const getProtein = useCallback(() => {
    if (!day) return { consumed: 0, target: 227 };
    const meals = getMealsForDay(dateStr);
    let consumed = 0;
    meals.forEach((meal) => {
      if (day.meals[meal.id]) {
        if (meal.protein !== null) {
          consumed += meal.protein;
        } else if (day.meal3Manual.protein) {
          consumed += Number(day.meal3Manual.protein) || 0;
        }
      }
    });
    return { consumed, target: 227 };
  }, [day, dateStr]);

  return {
    day,
    loading,
    toggleMeal,
    toggleSupplement,
    toggleRoutine,
    toggleSteps,
    toggleBedtime,
    setMeal3Manual,
    getCalories,
    getProtein,
    updateDay,
  };
}
