import { useCallback, useEffect, useMemo, useState } from 'react';
import { getData, setDataWithBackup as setData } from '../utils/storage';
import { getCareerPlans } from '../utils/careerPlan';

const CAREER_PROGRESS_ID = 'career-progress-v1';

function createEmptyProgress() {
  return {
    id: CAREER_PROGRESS_ID,
    checked: {},
    applications: {},
    notes: {},
    updatedAt: new Date().toISOString(),
  };
}

export function useCareer() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const plans = useMemo(() => getCareerPlans(), []);

  useEffect(() => {
    let cancelled = false;
    getData('career', CAREER_PROGRESS_ID).then((data) => {
      if (cancelled) return;
      setProgress(data || createEmptyProgress());
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const base = prev || createEmptyProgress();
      const next = typeof updater === 'function' ? updater(base) : { ...base, ...updater };
      const final = { ...next, id: CAREER_PROGRESS_ID, updatedAt: new Date().toISOString() };
      setData('career', final);
      return final;
    });
  }, []);

  const toggleTask = useCallback((dateStr, taskId) => {
    const key = `${dateStr}:${taskId}`;
    updateProgress((prev) => ({
      ...prev,
      checked: { ...prev.checked, [key]: !prev.checked[key] },
    }));
  }, [updateProgress]);

  const setApplications = useCallback((dateStr, value) => {
    updateProgress((prev) => ({
      ...prev,
      applications: {
        ...prev.applications,
        [dateStr]: value,
      },
    }));
  }, [updateProgress]);

  const setNotes = useCallback((dateStr, value) => {
    updateProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [dateStr]: value,
      },
    }));
  }, [updateProgress]);

  const getDayStats = useCallback((plan) => {
    if (!plan || !progress) return { done: 0, total: 0, pct: 0, applications: 0 };
    const done = plan.tasks.filter((task) => progress.checked[`${plan.date}:${task.id}`]).length;
    const total = plan.tasks.length;
    const applications = Number(progress.applications[plan.date] || 0);
    return {
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
      applications,
    };
  }, [progress]);

  const totals = useMemo(() => {
    if (!progress) return { completedTasks: 0, totalTasks: 0, pct: 0, applications: 0, daysComplete: 0 };
    const totalTasks = plans.reduce((sum, plan) => sum + plan.tasks.length, 0);
    const completedTasks = plans.reduce((sum, plan) => (
      sum + plan.tasks.filter((task) => progress.checked[`${plan.date}:${task.id}`]).length
    ), 0);
    const applications = Object.values(progress.applications).reduce((sum, value) => sum + Number(value || 0), 0);
    const daysComplete = plans.filter((plan) => plan.tasks.every((task) => progress.checked[`${plan.date}:${task.id}`])).length;
    return {
      completedTasks,
      totalTasks,
      pct: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      applications,
      daysComplete,
    };
  }, [plans, progress]);

  return {
    loading,
    progress,
    plans,
    totals,
    toggleTask,
    setApplications,
    setNotes,
    getDayStats,
  };
}
