import { formatDisplayDate, isWorkoutDay, formatDate } from '../utils/helpers';
import { useWorkout } from '../hooks/useWorkout';

export default function WorkoutPage({ date }) {
  const dateStr = formatDate(date);
  const { workout, workoutData, lastWeekData, loading, updateSet, toggleSet, isComplete } = useWorkout(dateStr);

  if (!isWorkoutDay(dateStr)) {
    return (
      <div className="page workout-page">
        <h1>Rest Day</h1>
        <p className="rest-message">No workout today. Focus on recovery, stretching, and hitting your nutrition goals.</p>
        <div className="rest-icon">&#x1F9D8;</div>
      </div>
    );
  }

  if (loading || !workoutData) return <div className="loading">Loading...</div>;

  return (
    <div className="page workout-page">
      <div className="day-header">
        <h1>{workout.name} Day</h1>
        <span className="day-subtitle">{formatDisplayDate(date)}</span>
        {isComplete && <div className="complete-badge">&#x2705; Complete!</div>}
      </div>

      {workout.exercises.map((exercise) => {
        const exData = workoutData.exercises[exercise.id];
        const lastWeekEx = lastWeekData?.exercises?.[exercise.id];

        return (
          <div key={exercise.id} className="card exercise-card">
            <div className="exercise-header">
              <h3>{exercise.name}</h3>
              <span className="rep-range">{exercise.sets} x {exercise.repsRange}</span>
            </div>

            {lastWeekEx && (
              <div className="last-week">
                <span className="last-week-label">Last week:</span>
                {lastWeekEx.sets.map((s, i) => (
                  <span key={i} className="last-week-set">
                    {s.weight || '—'}lb x {s.reps || '—'}
                  </span>
                ))}
              </div>
            )}

            <div className="sets-grid">
              <div className="sets-header">
                <span>Set</span>
                <span>Weight (lb)</span>
                <span>Reps</span>
                <span></span>
              </div>
              {exData?.sets.map((set, i) => (
                <div key={i} className={`set-row ${set.done ? 'set-done' : ''}`}>
                  <span className="set-number">{i + 1}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={set.weight}
                    onChange={(e) => updateSet(exercise.id, i, 'weight', e.target.value)}
                    className="set-input"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={set.reps}
                    onChange={(e) => updateSet(exercise.id, i, 'reps', e.target.value)}
                    className="set-input"
                  />
                  <button
                    className={`set-check ${set.done ? 'checked' : ''}`}
                    onClick={() => toggleSet(exercise.id, i)}
                  >
                    {set.done ? '\u2713' : ''}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
