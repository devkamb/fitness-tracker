import { formatDisplayDate, isWorkoutDay, formatDate } from '../utils/helpers';
import { useWorkout } from '../hooks/useWorkout';

function calcVolume(exercises) {
  let total = 0;
  Object.values(exercises || {}).forEach(ex => {
    ex.sets?.forEach(s => {
      if (s.done && s.weight && s.reps) {
        total += Number(s.weight) * Number(s.reps);
      }
    });
  });
  return total;
}

export default function WorkoutPage({ date }) {
  const dateStr = formatDate(date);
  const { workout, workoutData, lastWeekData, loading, updateSet, toggleSet, isComplete } = useWorkout(dateStr);

  if (!isWorkoutDay(dateStr)) {
    return (
      <div className="page workout-page">
        <h1>Rest Day</h1>
        <p className="rest-message">No workout today. Focus on recovery, stretching, and hitting your nutrition goals.</p>
        <div className="rest-tips">
          <div className="rest-tip">{'\uD83D\uDEB6'} 40 min evening walk</div>
          <div className="rest-tip">{'\uD83E\uDDD8'} 15 min stretching</div>
          <div className="rest-tip">{'\uD83E\uDEE8'} Foam roll sore muscles</div>
        </div>
      </div>
    );
  }

  if (loading || !workoutData) return <div className="loading">Loading...</div>;

  const todayVolume = calcVolume(workoutData.exercises);
  const lastVolume = calcVolume(lastWeekData?.exercises);
  const volumeChange = lastVolume > 0 ? Math.round(((todayVolume - lastVolume) / lastVolume) * 100) : null;

  return (
    <div className="page workout-page">
      <div className="day-header">
        <h1>{workout.name} Day</h1>
        <span className="day-subtitle">{workout.subtitle || formatDisplayDate(date)}</span>
        {isComplete && <div className="complete-badge">{'\u2705'} Complete!</div>}
      </div>

      {/* Warmup */}
      {workout.warmup && (
        <div className="card warmup-card">
          <h3>WARM-UP (5 min)</h3>
          {workout.warmup.map((item, i) => (
            <div key={i} className="warmup-item">{'\u2022'} {item}</div>
          ))}
        </div>
      )}

      {/* Volume tracker */}
      {todayVolume > 0 && (
        <div className="card volume-card">
          <div className="volume-row">
            <span className="volume-label">Total Volume</span>
            <span className="volume-value">{todayVolume.toLocaleString()} lbs</span>
          </div>
          {volumeChange !== null && (
            <div className="volume-row">
              <span className="volume-label">vs Last Week</span>
              <span className={`volume-change ${volumeChange >= 0 ? 'vol-up' : 'vol-down'}`}>
                {volumeChange >= 0 ? '+' : ''}{volumeChange}%
              </span>
            </div>
          )}
        </div>
      )}

      {workout.exercises.map((exercise) => {
        const exData = workoutData.exercises[exercise.id];
        const lastWeekEx = lastWeekData?.exercises?.[exercise.id];

        // Check if this week beat last week for this exercise
        const thisExVolume = exData?.sets?.reduce((sum, s) => s.done && s.weight && s.reps ? sum + Number(s.weight) * Number(s.reps) : sum, 0) || 0;
        const lastExVolume = lastWeekEx?.sets?.reduce((sum, s) => s.done && s.weight && s.reps ? sum + Number(s.weight) * Number(s.reps) : sum, 0) || 0;
        const beatLastWeek = lastExVolume > 0 && thisExVolume > lastExVolume;
        const behindLastWeek = lastExVolume > 0 && thisExVolume > 0 && thisExVolume < lastExVolume;

        return (
          <div key={exercise.id} className={`card exercise-card ${beatLastWeek ? 'ex-beat' : ''} ${behindLastWeek ? 'ex-behind' : ''}`}>
            <div className="exercise-header">
              <div>
                <h3>{exercise.name}</h3>
                {exercise.note && <span className="exercise-note">{exercise.note}</span>}
              </div>
              <span className="rep-range">{exercise.sets} x {exercise.repsRange}</span>
            </div>

            {lastWeekEx && (
              <div className="last-week">
                <span className="last-week-label">Last week:</span>
                {lastWeekEx.sets.map((s, i) => (
                  <span key={i} className="last-week-set">
                    {s.weight || '\u2014'}lb x {s.reps || '\u2014'}
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
              {exData?.sets.map((set, i) => {
                const lastSet = lastWeekEx?.sets?.[i];
                const beatSet = lastSet && set.done && set.weight && set.reps &&
                  (Number(set.weight) > Number(lastSet.weight || 0) ||
                   (Number(set.weight) === Number(lastSet.weight || 0) && Number(set.reps) > Number(lastSet.reps || 0)));

                return (
                  <div key={i} className={`set-row ${set.done ? 'set-done' : ''} ${beatSet ? 'set-beat' : ''}`}>
                    <span className="set-number">{i + 1}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder={lastSet?.weight || '0'}
                      value={set.weight}
                      onChange={(e) => updateSet(exercise.id, i, 'weight', e.target.value)}
                      className="set-input"
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder={lastSet?.reps || '0'}
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
