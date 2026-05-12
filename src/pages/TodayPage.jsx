import { formatDisplayDate, getScheduleForDay, isWorkoutDay, isSunday, getWeekNumber, formatDate, getTimeStatus, isProgressPhotoDay, getDaysUntilGraduation, getDaysUntilShredEnd, getDayTargets, isRefeedDay, isDeloadWeek, isGfBirthday } from '../utils/helpers';
import { MILESTONE_MESSAGES, USER } from '../utils/constants';
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
  const { day, loading, toggleTaskWithSync, toggleSteps, setStepCount, toggleBedtime, getCalories, getProtein, getCarbs } = useDay(dateStr);

  if (loading || !day) return <div className="loading">Loading...</div>;

  const schedule = getScheduleForDay(dateStr);
  const cal = getCalories();
  const prot = getProtein();
  const carb = getCarbs();
  const week = getWeekNumber(dateStr);
  const milestone = MILESTONE_MESSAGES[streak];
  const sun = isSunday(dateStr);
  const photoDay = isProgressPhotoDay(dateStr);
  const isWorkout = isWorkoutDay(dateStr);
  const refeed = isRefeedDay(dateStr);
  const deload = isDeloadWeek(dateStr);
  const birthday = isGfBirthday(dateStr);
  const daysLeft = getDaysUntilGraduation(dateStr);
  const daysToEnd = getDaysUntilShredEnd(dateStr);
  const targets = getDayTargets(dateStr);

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
          <span className="week-badge">Week {week}/{USER.totalWeeks}</span>
        </div>
        {streak > 0 && (
          <div className="streak-banner">
            <span className="streak-fire">{'\uD83D\uDD25'}</span> {streak} day streak
            {milestone && <span className="milestone-msg">{milestone}</span>}
          </div>
        )}
        {isWorkout && (() => {
          const dowKey = formatDate(date);
          const dowName = new Date(dowKey + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
          const labels = {
            monday: 'Push (Chest/Shoulders/Tri)',
            tuesday: 'Pull (Back/Biceps)',
            thursday: 'Legs (Quads/Hams/Glutes/Calves)',
            saturday: 'Upper (Pump)',
          };
          return (
            <div className="day-type-badge workout-badge">
              {'\uD83C\uDFCB'} {labels[dowName] || 'Workout'} Day
            </div>
          );
        })()}
        {!isWorkout && <div className="day-type-badge rest-badge">{'\uD83E\uDDD8'} Rest Day</div>}
        <div className="countdown-row">
          {daysLeft > 0 && (
            <div className="graduation-countdown">
              {'\uD83C\uDF93'} {daysLeft}d to graduation
            </div>
          )}
          {daysLeft === 0 && week <= 7 && (
            <div className="graduation-countdown graduation-today">
              {'\uD83C\uDF93'} GRADUATION DAY!
            </div>
          )}
          {daysToEnd > 0 && (
            <div className="graduation-countdown shred-countdown">
              {'\uD83D\uDC8E'} {daysToEnd}d to shredded
            </div>
          )}
          {daysToEnd === 0 && (
            <div className="graduation-countdown graduation-today">
              {'\uD83D\uDC8E'} FULLY SHREDDED!
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {photoDay && (
        <div className="card alert-card photo-alert">
          <span>{'\uD83D\uDCF8'} Progress Photo Day!</span>
          <span className="alert-sub">Front relaxed, front flexed, side (both), back {'\u2014'} same spot, same lighting, just shorts</span>
        </div>
      )}

      {refeed && (
        <div className="card alert-card refeed-alert">
          <span>{'\uD83C\uDF5A'} REFEED DAY</span>
          <span className="alert-sub">Add 50g rice to curry + extra banana + extra PB. ~{targets.calories} cal / {targets.carbs}g carbs.</span>
        </div>
      )}

      {deload && (
        <div className="card alert-card deload-alert">
          <span>{'\uD83D\uDD04'} DELOAD WEEK</span>
          <span className="alert-sub">Reduce weights 30%, volume 50% (2 sets instead of 3-4). Same exercises, focus on form.</span>
        </div>
      )}

      {birthday && (
        <div className="card alert-card refeed-alert">
          <span>{'\uD83C\uDF82'} GF's Birthday {'\u2014'} Strategic Refeed</span>
          <span className="alert-sub">Whey AM + yogurt PM + Indian restaurant dinner. ~1,950 cal. Back to normal tomorrow. Scale +2-3 lbs = water weight (gone by May 21).</span>
        </div>
      )}

      {sun && !birthday && (
        <div className="card alert-card prep-alert">
          <span>{'\uD83D\uDED2'} Meal Prep Day</span>
          <span className="alert-sub">10 lbs chicken {'\u2022'} Telugu sukha curry {'\u2022'} 262g per container (14 total)</span>
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
        <ProgressBar label="Carbs" current={carb.consumed} target={carb.target} unit="g" />
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

          return (
            <button
              key={`${task.id}-${i}`}
              className={`schedule-row ${checked ? 'srow-done' : ''} srow-${status}`}
              onClick={() => toggleTaskWithSync(task)}
            >
              <span className="srow-time">{task.time}</span>
              <span className={`srow-check ${checked ? 'srow-checked' : ''}`}>
                {checked ? '\u2713' : ''}
              </span>
              <div className="srow-content">
                <span className="srow-task">{task.task}</span>
                {task.calories != null && (
                  <span className="srow-macros">{task.calories} cal {'\u2022'} {task.protein}g protein</span>
                )}
              </div>
              <span className="srow-cat" style={{ color: style.color }}>{style.icon}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Goals */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>DAILY GOALS</h3>

        {/* Steps with manual input from Apple Watch */}
        <div className="steps-goal">
          <button className={`schedule-row ${day.steps ? 'srow-done' : ''}`} onClick={toggleSteps}>
            <span className="srow-time">{'\uD83D\uDEB6'}</span>
            <span className={`srow-check ${day.steps ? 'srow-checked' : ''}`}>
              {day.steps ? '\u2713' : ''}
            </span>
            <span className="srow-content">
              <span className="srow-task">{(targets.steps || 15000).toLocaleString()}+ steps</span>
              {day.stepCount && <span className="srow-macros">{Number(day.stepCount).toLocaleString()} steps logged</span>}
            </span>
          </button>
          <div className="steps-input-row">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Enter steps from Apple Watch"
              value={day.stepCount || ''}
              onChange={(e) => setStepCount(e.target.value)}
              className="input-steps"
            />
          </div>
        </div>

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
