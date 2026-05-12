import { useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import { useCareer } from '../hooks/useCareer';
import {
  CAREER_PHASES,
  CAREER_ROUTES,
  CAREER_START_DATE,
  CAREER_TOTAL_DAYS,
  getCareerDayNumber,
  getCareerPlanForDate,
} from '../utils/careerPlan';

function getDateForDay(dayNumber) {
  return format(addDays(new Date(`${CAREER_START_DATE}T00:00:00`), dayNumber - 1), 'yyyy-MM-dd');
}

function clampDay(dayNumber) {
  return Math.min(Math.max(dayNumber, 1), CAREER_TOTAL_DAYS);
}

export default function CareerStandalonePage() {
  const todayDay = getCareerDayNumber(format(new Date(), 'yyyy-MM-dd'));
  const initialDay = clampDay(todayDay);
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const selectedDate = getDateForDay(selectedDay);
  const {
    loading,
    progress,
    plans,
    totals,
    toggleTask,
    setApplications,
    setNotes,
    getDayStats,
  } = useCareer();

  const activePlan = getCareerPlanForDate(selectedDate);
  const phaseStats = useMemo(() => {
    if (!progress) return [];
    return CAREER_PHASES.map((phase) => {
      const phasePlans = plans.filter((plan) => plan.dayNumber >= phase.start && plan.dayNumber <= phase.end);
      const total = phasePlans.reduce((sum, plan) => sum + plan.tasks.length, 0);
      const done = phasePlans.reduce((sum, plan) => (
        sum + plan.tasks.filter((task) => progress.checked[`${plan.date}:${task.id}`]).length
      ), 0);
      return { ...phase, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
    });
  }, [plans, progress]);

  if (loading || !progress || !activePlan) {
    return <div className="career-only-loading">Loading career sprint...</div>;
  }

  const dayStats = getDayStats(activePlan);
  const notes = progress.notes[activePlan.date] || '';
  const applications = progress.applications[activePlan.date] || '';
  const selectedDateLabel = format(new Date(`${activePlan.date}T00:00:00`), 'EEE, MMM d');

  return (
    <div className="career-only-app">
      <header className="career-only-hero">
        <div className="career-only-kicker">OPT job sprint · starts May 18</div>
        <div className="career-only-title-row">
          <div>
            <h1>Career Command Center</h1>
            <p>QA Automation / SDET first. Application Support backup. ServiceNow hidden route.</p>
          </div>
          <div className="career-only-total">
            <span>{totals.pct}%</span>
            <small>complete</small>
          </div>
        </div>
      </header>

      <section className="career-only-metrics">
        <div>
          <span>{totals.completedTasks}/{totals.totalTasks}</span>
          <small>skill tasks</small>
        </div>
        <div>
          <span>{totals.applications}</span>
          <small>applications</small>
        </div>
        <div>
          <span>{totals.daysComplete}</span>
          <small>days closed</small>
        </div>
      </section>

      <section className="career-only-routes">
        {CAREER_ROUTES.map((route) => (
          <article key={route.id}>
            <span>{route.label}</span>
            <h2>{route.title}</h2>
            <p>{route.detail}</p>
          </article>
        ))}
      </section>

      <section className="career-only-day-panel">
        <div className="career-only-day-nav">
          <button onClick={() => setSelectedDay((day) => clampDay(day - 1))} disabled={selectedDay === 1} aria-label="Previous day">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <span>Day {activePlan.dayNumber} of {CAREER_TOTAL_DAYS}</span>
            <strong>{activePlan.title}</strong>
            <small>{selectedDateLabel} · {activePlan.phase.title}</small>
          </div>
          <button onClick={() => setSelectedDay((day) => clampDay(day + 1))} disabled={selectedDay === CAREER_TOTAL_DAYS} aria-label="Next day">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="career-only-focus">
          <span>{dayStats.pct}% today</span>
          <p>{activePlan.phase.focus}</p>
        </div>

        <div className="career-only-tasks">
          {activePlan.tasks.map((task) => {
            const checked = Boolean(progress.checked[`${activePlan.date}:${task.id}`]);
            return (
              <button
                key={task.id}
                className={`career-only-task ${checked ? 'done' : ''}`}
                onClick={() => toggleTask(activePlan.date, task.id)}
              >
                <span className="career-only-check">{checked ? '\u2713' : ''}</span>
                <span className="career-only-time">{task.block}</span>
                <span className="career-only-task-text">
                  <strong>{task.label}</strong>
                  <small>{task.detail}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="career-only-inputs">
          <label>
            Applications sent
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={applications}
              placeholder={`Target ${activePlan.targetApps}+`}
              onChange={(e) => setApplications(activePlan.date, e.target.value)}
            />
          </label>
          <label>
            Notes / blockers
            <textarea
              value={notes}
              placeholder="What did you learn, build, apply to, or struggle with?"
              onChange={(e) => setNotes(activePlan.date, e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="career-only-phases">
        <h2>Phase Progress</h2>
        {phaseStats.map((phase) => (
          <button
            key={phase.title}
            className={activePlan.phase.title === phase.title ? 'active' : ''}
            onClick={() => setSelectedDay(phase.start)}
          >
            <span>
              <strong>{phase.title}</strong>
              <small>Days {phase.start}-{phase.end}</small>
            </span>
            <em>{phase.pct}%</em>
          </button>
        ))}
      </section>

      <section className="career-only-roadmap">
        <h2>60-Day Plan</h2>
        <div>
          {plans.map((plan) => {
            const stats = getDayStats(plan);
            return (
              <button
                key={plan.date}
                className={`${selectedDay === plan.dayNumber ? 'active' : ''} ${stats.pct === 100 ? 'done' : ''}`}
                onClick={() => setSelectedDay(plan.dayNumber)}
              >
                <span>D{plan.dayNumber}</span>
                <strong>{plan.title}</strong>
                <small>{stats.done}/{stats.total}</small>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
