import { format } from 'date-fns';
import ProgressBar from '../components/ProgressBar';
import { useCareer } from '../hooks/useCareer';
import { CAREER_ROUTES, CAREER_START_DATE, CAREER_TOTAL_DAYS, getCareerPlanForDate } from '../utils/careerPlan';
import { formatDate } from '../utils/helpers';

export default function CareerPage({ date }) {
  const dateStr = formatDate(date);
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

  if (loading || !progress) return <div className="loading">Loading career plan...</div>;

  const todayPlan = getCareerPlanForDate(dateStr);
  const activePlan = todayPlan || plans[0];
  const dayStats = getDayStats(activePlan);
  const notes = progress.notes[activePlan.date] || '';
  const firstDate = format(new Date(`${CAREER_START_DATE}T00:00:00`), 'MMM d');
  const lastDate = format(new Date(`${plans[plans.length - 1].date}T00:00:00`), 'MMM d, yyyy');

  return (
    <div className="page career-page">
      <div className="day-header career-header">
        <div className="day-header-top">
          <div>
            <h1>Career</h1>
            <p className="day-subtitle">60-day QA/SDET + support job sprint</p>
          </div>
          <span className="week-badge">Day {activePlan.dayNumber}/{CAREER_TOTAL_DAYS}</span>
        </div>
      </div>

      <div className="card career-summary-card">
        <h3>CAREER PROGRESS</h3>
        <ProgressBar label="Skill Sprint" current={totals.completedTasks} target={totals.totalTasks} unit="tasks" />
        <div className="career-stat-grid">
          <div className="career-stat">
            <span className="career-stat-value">{totals.daysComplete}</span>
            <span className="career-stat-label">days complete</span>
          </div>
          <div className="career-stat">
            <span className="career-stat-value">{totals.applications}</span>
            <span className="career-stat-label">applications</span>
          </div>
          <div className="career-stat">
            <span className="career-stat-value">{totals.pct}%</span>
            <span className="career-stat-label">overall</span>
          </div>
        </div>
        <p className="hint career-date-range">Start {firstDate} · Finish {lastDate}</p>
      </div>

      <div className="career-routes">
        {CAREER_ROUTES.map((route) => (
          <div key={route.id} className="card career-route-card">
            <div className="career-route-top">
              <span className="career-route-label">{route.label}</span>
              <strong>{route.title}</strong>
            </div>
            <p>{route.detail}</p>
          </div>
        ))}
      </div>

      {!todayPlan && (
        <div className="card alert-card career-alert">
          <span>This plan starts on May 18, 2026.</span>
          <span className="alert-sub">Use the date arrows to view each day. Your workout and gym logs stay separate.</span>
        </div>
      )}

      <div className="card career-day-card">
        <div className="career-day-title">
          <div>
            <h3>{activePlan.phase.title.toUpperCase()}</h3>
            <h2>Day {activePlan.dayNumber}: {activePlan.title}</h2>
            <p>{format(new Date(`${activePlan.date}T00:00:00`), 'EEEE, MMM d')} · {activePlan.phase.focus}</p>
          </div>
          <span className="pct-badge">{dayStats.pct}%</span>
        </div>

        <div className="career-task-list">
          {activePlan.tasks.map((task) => {
            const checked = Boolean(progress.checked[`${activePlan.date}:${task.id}`]);
            return (
              <button
                key={task.id}
                className={`career-task-row ${checked ? 'career-task-done' : ''}`}
                onClick={() => toggleTask(activePlan.date, task.id)}
              >
                <span className={`srow-check ${checked ? 'srow-checked' : ''}`}>{checked ? '\u2713' : ''}</span>
                <span className="career-task-time">{task.block}</span>
                <span className="career-task-main">
                  <strong>{task.label}</strong>
                  <span>{task.detail}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="career-input-row">
          <label>
            <span>Applications sent today</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={progress.applications[activePlan.date] || ''}
              placeholder={`Target ${activePlan.targetApps}+`}
              onChange={(e) => setApplications(activePlan.date, e.target.value)}
            />
          </label>
        </div>

        <div className="career-notes">
          <label htmlFor="career-notes">Notes / blockers / interview questions</label>
          <textarea
            id="career-notes"
            value={notes}
            placeholder="Write what you learned, what you built, and what needs review."
            onChange={(e) => setNotes(activePlan.date, e.target.value)}
          />
        </div>
      </div>

      <div className="card career-roadmap-card">
        <h3>60-DAY ROADMAP</h3>
        <div className="career-roadmap">
          {plans.map((plan) => {
            const stats = getDayStats(plan);
            return (
              <div key={plan.date} className={`career-roadmap-row ${stats.pct === 100 ? 'roadmap-done' : ''}`}>
                <span className="career-roadmap-day">D{plan.dayNumber}</span>
                <span className="career-roadmap-title">
                  <strong>{plan.title}</strong>
                  <span>{format(new Date(`${plan.date}T00:00:00`), 'MMM d')} · {plan.phase.title}</span>
                </span>
                <span className="career-roadmap-pct">{stats.done}/{stats.total}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
