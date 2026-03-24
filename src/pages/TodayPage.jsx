import { formatDisplayDate, getScheduleForDay, isWorkoutDay, isSaturday, isSunday, getWeekNumber, formatDate, getTimeStatus, isProgressPhotoDay } from '../utils/helpers';
import { MILESTONE_MESSAGES } from '../utils/constants';
import { useDay } from '../hooks/useDay';
import ProgressBar from '../components/ProgressBar';

// Category icons & colors
const CAT_STYLE = {
  routine:    { icon: '\u23F0', color: 'var(--text-secondary)' },
  gym:        { icon: '\uD83C\uDFCB', color: 'var(--orange)' },
  exercise:   { icon: '\uD83D\uDCAA', color: 'var(--orange)' },
  meal:       { icon: '\uD83C\uDF7D\uFE0F', color: 'var(--green)' },
  supplement: { icon: '\uD83D\uDC8A', color: 'var(--tint)' },
  goal:       { icon: '\uD83C\uDFAF', color: 'var(--yellow)' },
  sleep:      { icon: '\uD83C\uDF19', color: 'var(--tint)' },
  prep:       { icon: '\uD83E\uDDC1', color: 'var(--orange)' },
};

export default function TodayPage({ date, streak, onNavigateWorkout }) {
  const dateStr = formatDate(date);
  const { day, loading, toggleTaskWithSync, toggleSteps, toggleBedtime, setMeal3Manual, getCalories, getProtein } = useDay(dateStr);

  if (loading || !day) return <div className="loading">Loading...</div>;

  const schedule = getScheduleForDay(dateStr);
  const cal = getCalories();
  const prot = getProtein();
  const week = getWeekNumber(dateStr);
  const milestone = MILESTONE_MESSAGES[streak];
  const sat = isSaturday(dateStr);
  const sun = isSunday(dateStr);
  const photoDay = isProgressPhotoDay(dateStr);
  const isWorkout = isWorkoutDay(dateStr);

  // Group tasks by time section
  const sections = [];
  let currentSection = null;
  schedule.forEach((task) => {
    const hour = task.time.match(/(\d+):/)?.[1];
    const ampm = task.time.includes('PM') ? 'PM' : 'AM';
    const sectionKey = `${hour} ${ampm}`;
    if (!currentSection || currentSection.key !== sectionKey) {
      currentSection = { key: sectionKey, tasks: [] };
      sections.push(currentSection);
    }
    currentSection.tasks.push(task);
  });

  const checkedCount = schedule.filter(t => day.checked[t.id]).length;
  const totalCount = schedule.length;
  const pctDone = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="page today-page">
      {/* Header */}
      <div className="day-header">
        <div className="day-header-top">
          <h1>{formatDisplayDate(date)}</h1>
          <span className="week-badge">Week {week}</span>
        </div>
        {streak > 0 && (
          <div className="streak-banner">
            <span className="streak-fire">{'\uD83D\uDD25'}</span> {streak} day streak
            {milestone && <span className="milestone-msg">{milestone}</span>}
          </div>
        )}
        {isWorkout && (
          <div className="day-type-badge workout-badge">
            {'\uD83C\uDFCB'} {isWorkoutDay(dateStr) ? schedule.find(t => t.cat === 'exercise')?.task.split(':')[0] || 'Workout' : 'Rest'} Day
          </div>
        )}
        {!isWorkout && <div className="day-type-badge rest-badge">{'\uD83E\uDDD8'} Rest Day</div>}
      </div>

      {/* Alerts */}
      {photoDay && (
        <div className="card alert-card photo-alert">
          <span>{'\uD83D\uDCF8'} Progress Photo Day!</span>
          <span className="alert-sub">Front, side, back \u2014 same spot, same lighting, just shorts</span>
        </div>
      )}

      {sun && (
        <div className="card alert-card prep-alert">
          <span>{'\uD83D\uDED2'} Meal Prep Day</span>
          <span className="alert-sub">8.5 lbs chicken \u2022 21 bananas \u2022 Portion into 21 containers</span>
        </div>
      )}

      {/* Progress */}
      <div className="card totals-card">
        <div className="totals-header">
          <h3>TODAY'S PROGRESS</h3>
          <span className="pct-badge">{pctDone}%</span>
        </div>
        <ProgressBar label="Calories" current={cal.consumed} target={cal.target} unit="cal" />
        <ProgressBar label="Protein" current={prot.consumed} target={prot.target} unit="g" />
        <div className="progress-bar-container">
          <div className="progress-label">
            <span>Tasks</span>
            <span>{checkedCount}/{totalCount}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pctDone}%` }} />
          </div>
        </div>
      </div>

      {/* Workout quick link */}
      {isWorkout && (
        <button className="btn btn-workout" onClick={onNavigateWorkout}>
          Log Sets & Weights &rarr;
        </button>
      )}

      {/* Full Schedule */}
      <div className="schedule-list">
        {schedule.map((task, i) => {
          const checked = day.checked[task.id] || false;
          const status = getTimeStatus(task.time, dateStr);
          const style = CAT_STYLE[task.cat] || CAT_STYLE.routine;
          const isDateMeal = task.id === 'meal3_date';

          return (
            <div key={`${task.id}-${i}`}>
              <button
                className={`schedule-row ${checked ? 'srow-done' : ''} srow-${status}`}
                onClick={() => toggleTaskWithSync(task)}
              >
                <span className="srow-time">{task.time}</span>
                <span className={`srow-check ${checked ? 'srow-checked' : ''}`}>
                  {checked ? '\u2713' : ''}
                </span>
                <div className="srow-content">
                  <span className="srow-task">{task.task}</span>
                  {task.calories && (
                    <span className="srow-macros">{task.calories} cal \u2022 {task.protein}g protein</span>
                  )}
                </div>
                <span className="srow-cat" style={{ color: style.color }}>{style.icon}</span>
              </button>

              {/* Saturday date night manual entry */}
              {isDateMeal && sat && checked && (
                <div className="manual-entry">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Calories"
                    value={day.meal3Manual.calories}
                    onChange={(e) => setMeal3Manual('calories', e.target.value)}
                    className="input-small"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Protein (g)"
                    value={day.meal3Manual.protein}
                    onChange={(e) => setMeal3Manual('protein', e.target.value)}
                    className="input-small"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Goals */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>DAILY GOALS</h3>
        <button className={`schedule-row ${day.steps ? 'srow-done' : ''}`} onClick={toggleSteps}>
          <span className="srow-time">{'\uD83D\uDEB6'}</span>
          <span className={`srow-check ${day.steps ? 'srow-checked' : ''}`}>
            {day.steps ? '\u2713' : ''}
          </span>
          <span className="srow-content"><span className="srow-task">10,000 steps completed</span></span>
        </button>
        <button className={`schedule-row ${day.bedtime ? 'srow-done' : ''}`} onClick={toggleBedtime}>
          <span className="srow-time">{'\uD83C\uDF19'}</span>
          <span className={`srow-check ${day.bedtime ? 'srow-checked' : ''}`}>
            {day.bedtime ? '\u2713' : ''}
          </span>
          <span className="srow-content"><span className="srow-task">In bed by 11:00 PM</span></span>
        </button>
      </div>
    </div>
  );
}
